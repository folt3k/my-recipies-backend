import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateRecipeDto } from './recipe.dto';
import { RecipeService } from './recipe.service';
import { ApiBearerAuth, ApiTags, ApiBody, ApiQuery, ApiParam } from '@nestjs/swagger';
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

  @Get(':id')
  @ApiParam({ name: 'id', type: 'string', required: true })
  async getOne(@Param() params: { id: string }) {
    return this.recipeService.getOne(params.id);
  }

  @Get()
  @ApiQuery({ name: 'page', type: 'number', required: false })
  @ApiQuery({ name: 'perPage', type: 'number', required: false })
  async getAll(@Query() params: { page?: string; perPage?: string }) {
    return this.recipeService.getAll(params);
  }
}
