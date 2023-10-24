import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UpsertRecipeDto } from './recipe.dto';
import { RecipeService } from './recipe.service';
import { ApiBearerAuth, ApiTags, ApiBody, ApiQuery, ApiParam } from '@nestjs/swagger';
import { upsertRecipeExampleData } from './recipe.swagger';
import { GetAllRecipesQueryParams } from './recipe.types';

@ApiBearerAuth()
@ApiTags('recipes')
@Controller('recipes')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Post()
  @ApiBody({
    type: UpsertRecipeDto,
    examples: upsertRecipeExampleData,
  })
  async create(@Body() body: UpsertRecipeDto) {
    return this.recipeService.create(body);
  }

  @Put(':id')
  @ApiBody({
    type: UpsertRecipeDto,
    examples: upsertRecipeExampleData,
  })
  async update(@Param() params: { id: string }, @Body() body: UpsertRecipeDto) {
    return this.recipeService.update(params.id, body);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'string', required: true })
  async getOne(@Param() params: { id: string }) {
    return this.recipeService.getOne(params.id);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string', required: true })
  async delete(@Param() params: { id: string }) {
    return this.recipeService.delete(params.id);
  }

  @Get()
  @ApiQuery({ name: 'page', type: 'number', required: false })
  @ApiQuery({ name: 'perPage', type: 'number', required: false })
  @ApiQuery({ name: 'tags', type: 'array', required: false })
  @ApiQuery({ name: 'q', type: 'string', required: false })
  async getAll(@Query() params: GetAllRecipesQueryParams) {
    return this.recipeService.getAll(params);
  }
}
