import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateRecipeImageDto } from './image.dto';
import { RecipeImage } from './image.entity';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

@Injectable()
export class RecipeImageService {
  constructor(
    private dataSource: DataSource,
    private httpService: HttpService,
  ) {}

  async saveAll(images: CreateRecipeImageDto[], recipeId?: string): Promise<RecipeImage[]> {
    if (recipeId) {
      await this.dataSource.manager.delete<RecipeImage>(RecipeImage, {
        recipe: recipeId,
      });
    }

    const newImages = await Promise.all(
      images.map((image) => {
        return this.httpService
          .get(image.url, {
            responseType: 'arraybuffer',
          })
          .pipe(
            map((downloadImage) => {
              const base64 = Buffer.from(downloadImage.data).toString('base64');
              const imgBase64 = `data:${downloadImage.headers['content-type']}';base64,${base64}`;

              return this.dataSource.manager.create<RecipeImage>(RecipeImage, { base64: imgBase64 });
            }),
          )
          .toPromise();
      }),
    );
    return await this.dataSource.manager.save(newImages);
  }
}
