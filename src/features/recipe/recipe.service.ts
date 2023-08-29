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
      ingredientCategories: dto.ingredientCategories,
    });

    const savedRecipe = await this.recipeRepository.save(newRecipe);

    return this.recipeRepository.findOne({
      where: { id: savedRecipe.id },
    });
  }
}
