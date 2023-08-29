import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { RecipeImage } from './image/image.entity';
import { RecipeIngredient, RecipeIngredientCategory } from './ingredient/ingredient.entity';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, RecipeImage, RecipeIngredient, RecipeIngredientCategory])],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
