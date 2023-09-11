import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecipeDto } from './recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { DataSource, In, Like, Repository } from 'typeorm';
import { RecipeTagService } from './tag/tag.service';
import { RecipeImageService } from './image/image.service';
import { GetAllRecipesQueryParams } from './recipe.types';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe) private recipeRepository: Repository<Recipe>,
    private dataSource: DataSource,
    private tagService: RecipeTagService,
    private imageService: RecipeImageService,
  ) {}

  async create(dto: CreateRecipeDto): Promise<Recipe> {
    return this.dataSource.transaction(async (manager) => {
      const savedTags = await this.tagService.saveAll(dto.tags);
      const savedImages = await this.imageService.saveAll(dto.images);

      const newRecipe = manager.create(Recipe, {
        name: dto.name,
        content: dto.content,
        ingredients: dto.ingredients,
        images: savedImages,
        tags: savedTags,
      });

      const saveRecipe = await manager.save(newRecipe);

      return await manager.findOne(Recipe, { where: { id: saveRecipe.id } });
    });
  }

  async getAll(
    params: GetAllRecipesQueryParams = {},
  ): Promise<{ page: number; perPage: number; total: number; items: Recipe[] }> {
    console.log(params);
    const page = params.page ? +params.page : 1;
    const perPage = params.perPage ? +params.perPage : 10;

    const query = this.recipeRepository.createQueryBuilder('recipe').leftJoinAndSelect('recipe.tags', 'tags');

    if (params.q) {
      query.where('recipe.name LIKE :name', { name: `%${params.q}` });
      // query.orWhere('recipe.ingredients ::jsonb @> :ingredients', {
      //   ingredients: params.q,
      // });
    }

    if (params.tags) {
      const tags = Array.isArray(params.tags) ? params.tags : [params.tags];
      console.log(`(${tags.map((tag) => `'${tag}'`).join(',')})`);

      query.leftJoin('recipe.tags', 'inner_tags');

      tags.forEach((tag) => {
        query.andWhere('inner_tags.name IN (:...tag)', { tag: [tag] });
      });
    }

    query
      .orderBy('recipe.createdAt', 'DESC')
      .skip((page - 1) * perPage)
      .take(perPage);

    console.log(query.getSql());

    const items = await this.recipeRepository.find({
      where: {
        tags: {
          name: In(params.tags),
        },
      },
    });

    console.log(items[0]);
    const total = await query.getCount();

    return { page, perPage, total, items: items };
  }

  async getOne(id: string): Promise<Recipe> {
    try {
      return await this.dataSource.manager.findOneOrFail(Recipe, { where: { id } });
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
