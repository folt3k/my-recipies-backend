import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateRecipeDto } from './recipe.dto';
import { RecipeService } from './recipe.service';
import { ApiBearerAuth, ApiTags, ApiBody, ApiQuery } from '@nestjs/swagger';
import { createRecipeExampleData } from './recipe.swagger';

@ApiBearerAuth()
@ApiTags('recipes')
@Controller('recipes')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Post()
  @ApiBody({
    type: CreateRecipeDto,
    examples: createRecipeExampleData,
  })
  async create(@Body() body: CreateRecipeDto) {
    return this.recipeService.create(body);
  }

  @Get()
  @ApiQuery({ name: 'page', type: 'number', required: false })
  @ApiQuery({ name: 'perPage', type: 'number', required: false })
  async getAll(@Query() params: { page?: string; perPage?: string }) {
    return this.recipeService.getAll(params);
  }
}
