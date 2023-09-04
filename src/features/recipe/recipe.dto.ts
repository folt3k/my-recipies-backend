import { RecipeIngredientsGroup, RecipeIngredient } from './ingredient/ingredient.types';

export interface CreateRecipeDto {
  name: string;
  content: string;
  images: Array<{ id: string }>;
  ingredients: RecipeIngredientsGroup[] | RecipeIngredient[];
}
