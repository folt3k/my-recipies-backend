import * as fs from 'fs';
import { join, dirname, extname } from 'path';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateRecipeImageDto } from './image.dto';
import { RecipeImage } from './image.entity';
import { HttpService } from '@nestjs/axios';
import { catchError, map, of } from 'rxjs';
import { generateRandomString } from '../../../shared/utils/random-string.util';

const appDir = dirname(require.main.filename);
const imagesDir = join(appDir, '..', 'public', 'images');

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
            catchError(() => of(null)),
            map(async (downloadImage) => {
              if (downloadImage) {
                return this.saveImage(downloadImage.data, image.url);
              }

              return null;
            }),
          )
          .toPromise();
      }),
    );

    const newImagesToSave = newImages.filter((img) => img);

    return await this.dataSource.manager.save(newImagesToSave);
  }

  private async saveImage(downloadedImage: string, imageUrl: string): Promise<RecipeImage> {
    const imageName = `${Date.now()}-${generateRandomString()}${extname(imageUrl)}`;
    const fileDir = join(imagesDir, imageName);

    return new Promise<RecipeImage>((resolve) => {
      fs.writeFile(fileDir, downloadedImage, () => {});

      const newImage = this.dataSource.manager.create<RecipeImage>(RecipeImage, {
        name: imageName,
      });

      resolve(newImage);
    });
  }
}
