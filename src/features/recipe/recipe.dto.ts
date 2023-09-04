import { RecipeIngredientsGroup, RecipeIngredient } from './ingredient/ingredient.types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipeDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  images: Array<{ id: string }>;

  @ApiProperty()
  ingredients: RecipeIngredientsGroup[] | RecipeIngredient[];
}
