import { RecipeIngredientsGroup, RecipeIngredient } from './ingredient/ingredient.types';
import { ApiProperty } from '@nestjs/swagger';
import { RecipeImage } from './image/image.entity';

export class UpsertRecipeDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  images: UpsertImagesDto;

  @ApiProperty()
  ingredients: RecipeIngredientsGroup[] | RecipeIngredient[];

  @ApiProperty()
  tags: Array<{ name: string }>;
}

export interface UpsertImagesDto {
  new: Array<{ url: string }>;
  uploaded?: Array<RecipeImage>;
}
