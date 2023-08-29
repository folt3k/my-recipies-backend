export interface CreateIngredientCategoryDto {
  name: string;
  ingredients: CreateIngredientDto[];
}

export interface CreateIngredientDto {
  name: string;
}
