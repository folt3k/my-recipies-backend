import { CreateIngredientCategoryDto } from './ingredient/ingredient.dto';

export interface CreateRecipeDto {
  name: string;
  content: string;
  images: Array<{ id: string }>;
  ingredientCategories: CreateIngredientCategoryDto[];
}
