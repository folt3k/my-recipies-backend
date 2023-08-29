import { Body, Controller, Post } from '@nestjs/common';
import { CreateRecipeDto } from './recipe.dto';
import { RecipeService } from './recipe.service';

@Controller('recipe')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Post('')
  async create(@Body() body: CreateRecipeDto) {
    return this.recipeService.create(body);
  }
}
