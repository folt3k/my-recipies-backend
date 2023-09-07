import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateRecipeImageDto } from './image.dto';
import { RecipeImage } from './image.entity';

@Injectable()
export class RecipeImageService {
  constructor(private dataSource: DataSource) {}

  async saveAll(data: CreateRecipeImageDto[]): Promise<RecipeImage[]> {
    const newImages = data.map((image) => this.dataSource.manager.create<RecipeImage>(RecipeImage, image));

    return await this.dataSource.manager.save(newImages);
  }
}
