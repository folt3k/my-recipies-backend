import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { Repository } from 'typeorm';
import { RecipeIngredientCategory } from './ingredient/ingredient.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe) private recipeRepository: Repository<Recipe>,
    @InjectRepository(RecipeIngredientCategory)
    private recipeCategoryRepository: Repository<RecipeIngredientCategory>,
  ) {}

  async create(dto: CreateRecipeDto): Promise<Recipe> {
    const ingredientCategories = await Promise.all(
      dto.ingredientCategories.map((cat) =>
        this.recipeCategoryRepository.save({ name: cat.name, ingredients: cat.ingredients }),
      ),
    );

    const newRecipe = this.recipeRepository.create({
      name: dto.name,
      content: dto.content,
      images: dto.images,
      // ingredientCategories: dto.ingredientCategories.map((cat) => ({
      //   name: cat.name,
      //   // ingredients: cat.ingredients.map((ing) => ({ name: ing.name })),
      // })),
      ingredientCategories,
    });

    const savedRecipe = await this.recipeRepository.save(newRecipe);

    return this.recipeRepository.findOne({
      where: { id: savedRecipe.id },
      relations: {
        ingredientCategories: {
          ingredients: true,
        },
      },
    });
  }
}
