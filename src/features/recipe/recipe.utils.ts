import { RecipeIngredient, RecipeIngredientsGroup } from './ingredient/ingredient.types';

export const hasIngredientCategories = (
  ingredients: RecipeIngredientsGroup[] | RecipeIngredient[],
): boolean => {
  if (!ingredients?.length) {
    return false;
  }

  return !!(ingredients[0] as RecipeIngredientsGroup).items?.length;
};
