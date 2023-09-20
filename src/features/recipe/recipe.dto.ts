import { RecipeIngredientsGroup, RecipeIngredient } from './ingredient/ingredient.types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipeDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  images: Array<{ url: string }>;

  @ApiProperty()
  ingredients: RecipeIngredientsGroup[] | RecipeIngredient[];

  @ApiProperty()
  tags: Array<{ name: string }>;
}
