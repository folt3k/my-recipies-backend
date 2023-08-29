import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { RecipeImage } from './image/image.entity';
import { RecipeIngredient, RecipeIngredientCategory } from './ingredient/ingredient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, RecipeImage, RecipeIngredient, RecipeIngredientCategory])],
})
export class RecipeModule {}
