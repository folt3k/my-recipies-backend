import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecipeService {
  constructor(@InjectRepository(Recipe) private recipeRepository: Repository<Recipe>) {}

  async create(dto: CreateRecipeDto): Promise<Recipe> {
    const newRecipe = this.recipeRepository.create({
      name: dto.name,
      content: dto.content,
      images: dto.images,
      ingredients: dto.ingredients,
    });

    const savedRecipe = await this.recipeRepository.save(newRecipe);

    return this.recipeRepository.findOne({
      where: { id: savedRecipe.id },
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
