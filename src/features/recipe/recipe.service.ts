import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { UpsertRecipeDto } from './recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { DataSource, Repository } from 'typeorm';
import { RecipeTagService } from './tag/tag.service';
import { RecipeImageService } from './image/image.service';
import { GetAllRecipesQueryParams } from './recipe.types';
import { RecipeTag } from './tag/tag.entity';
import { hasIngredientCategories } from './recipe.utils';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe) private recipeRepository: Repository<Recipe>,
    @InjectRepository(RecipeTag) private tagRepository: Repository<RecipeTag>,
    private dataSource: DataSource,
    private tagService: RecipeTagService,
    private imageService: RecipeImageService,
  ) {}

  async create(dto: UpsertRecipeDto): Promise<Recipe> {
    return this.dataSource.transaction(async (manager) => {
      const savedTags = await this.tagService.saveAll(dto.tags);

      const savedImages = await this.imageService.saveNewImages(dto.images.new);

      const newRecipe = manager.create(Recipe, {
        name: dto.name,
        description: dto.description,
        content: dto.content,
        ingredients: dto.ingredients,
        hasIngredientCategories: hasIngredientCategories(dto.ingredients),
        images: savedImages,
        tags: savedTags,
      });

      const saveRecipe = await manager.save(newRecipe);

      return await manager.findOne(Recipe, { where: { id: saveRecipe.id } });
    });
  }

  async update(id: string, dto: UpsertRecipeDto): Promise<Recipe> {
    return this.dataSource.transaction(async (manager) => {
      try {
        await manager.findOneOrFail(Recipe, { where: { id } });
      } catch (e) {
        throw new HttpException('Taki przepis nie istnieje.', 404);
      }

      const savedTags = await this.tagService.saveAll(dto.tags);

      const preloadedRecipe = await manager.preload(Recipe, {
        id: id,
        name: dto.name,
        description: dto.description,
        content: dto.content,
        ingredients: dto.ingredients,
        hasIngredientCategories: hasIngredientCategories(dto.ingredients),
        tags: savedTags,
      });

      const updatedRecipe = await manager.save(preloadedRecipe);

      await this.imageService.updateImages(dto.images, id);

      return await manager.findOne(Recipe, { where: { id: updatedRecipe.id } });
    });
  }

  async getAll(
    params: GetAllRecipesQueryParams = {},
  ): Promise<{ page: number; perPage: number; total: number; items: Recipe[] }> {
    const page = params.page ? +params.page : 1;
    const perPage = params.perPage ? +params.perPage : 10;

    const query = this.recipeRepository
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.tags', 'tags')
      .leftJoinAndSelect('recipe.images', 'images');

    if (params.q) {
      query.where('recipe.name ILIKE (:q)', { q: `%${params.q}%` });
      query.orWhere('recipe.content ILIKE (:q)', { q: `%${params.q}%` });
    }

    if (params.tags) {
      const tags = Array.isArray(params.tags) ? params.tags : [params.tags];

      const sb = this.tagRepository
        .createQueryBuilder('it')
        .select('rt.recipeId')
        .innerJoin('recipe_tags_recipe_tag', 'rt', 'it.id = rt.recipeTagId')
        .where(`rt.recipeId = recipe.id AND it.name IN (:...tags)`);

      query.andWhere(`recipe.id IN (${sb.getQuery()})`).setParameter('tags', tags);
    }

    query
      .orderBy('recipe.createdAt', 'DESC')
      .skip((page - 1) * perPage)
      .take(perPage);

    const [items, total] = await query.getManyAndCount();

    return { page, perPage, total, items };
  }

  async getOne(id: string): Promise<Recipe> {
    try {
      return await this.dataSource.manager.findOneOrFail(Recipe, { where: { id } });
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
