import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { DataSource, Repository } from 'typeorm';
import { RecipeTagService } from './tag/tag.service';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe) private recipeRepository: Repository<Recipe>,
    private dataSource: DataSource,
    private tagService: RecipeTagService,
  ) {}

  async create(dto: CreateRecipeDto): Promise<Recipe> {
    return this.dataSource.transaction(async (manager) => {
      const savedTags = await this.tagService.saveAll(dto.tags);

      const newRecipe = manager.create(Recipe, {
        name: dto.name,
        content: dto.content,
        images: dto.images,
        ingredients: dto.ingredients,
        tags: savedTags,
      });

      const saveRecipe = await manager.save(newRecipe);

      return await manager.findOne(Recipe, { where: { id: saveRecipe.id } });
    });
  }

  async getAll(
    params: {
      page?: string;
      perPage?: string;
    } = {},
  ): Promise<{ page: number; perPage: number; total: number; items: Recipe[] }> {
    const page = params.page ? +params.page : 1;
    const perPage = params.perPage ? +params.perPage : 10;

    const items = await this.recipeRepository.find({
      order: { createdAt: 'desc' },
      skip: (page - 1) * perPage,
      take: perPage,
    });

    const total = await this.recipeRepository.count();

    return { page, perPage, total, items: items };
  }
}
