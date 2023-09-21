import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { RecipeImage } from './image/image.entity';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { RecipeTag } from './tag/tag.entity';
import { RecipeTagService } from './tag/tag.service';
import { RecipeImageService } from './image/image.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, RecipeImage, RecipeTag]), HttpModule],
  controllers: [RecipeController],
  providers: [RecipeService, RecipeTagService, RecipeImageService],
})
export class RecipeModule {}
