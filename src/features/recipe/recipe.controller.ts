import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateRecipeDto } from './recipe.dto';
import { RecipeService } from './recipe.service';

@Controller('recipes')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Post()
  async create(@Body() body: CreateRecipeDto) {
    return this.recipeService.create(body);
  }

  @Get()
  async getAll(@Query() params: { page?: string; perPage?: string }) {
    return this.recipeService.getAll(params);
  }
}
