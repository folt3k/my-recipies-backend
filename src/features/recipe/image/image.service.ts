import * as fs from 'fs';
import * as mimeTypes from 'mime-types';
import { join, dirname } from 'path';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { RecipeImage } from './image.entity';
import { HttpService } from '@nestjs/axios';
import { catchError, map, of } from 'rxjs';
import { generateRandomString } from '../../../shared/utils/random-string.util';
import { UpsertImagesDto } from '../recipe.dto';

const appDir = dirname(require.main.filename);
const imagesDir = join(appDir, '..', 'public', 'images');

@Injectable()
export class RecipeImageService {
  constructor(
    private dataSource: DataSource,
    private httpService: HttpService,
  ) {}

  async updateImages(images: UpsertImagesDto, recipeId: string): Promise<void> {
    const existedImages = await this.dataSource.manager.find(RecipeImage, {
      where: { recipe: { id: recipeId } },
    });
    const imagesToDelete = existedImages.filter((image) => !images.uploaded?.find((i) => i.id === image.id));

    await Promise.all([
      ...imagesToDelete.map((image) => this.deleteImage(image)),
      this.saveNewImages(images.new, recipeId),
    ]);
  }

  async saveNewImages(images: Array<{ url: string }>, recipeId?: string): Promise<RecipeImage[]> {
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
                const imageExt = mimeTypes.extension(downloadImage.headers['content-type']);

                return this.saveImage(downloadImage.data, imageExt as string, recipeId);
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

  private async saveImage(
    downloadedImage: string,
    imageExt: string,
    recipeId?: string,
  ): Promise<RecipeImage> {
    const imageName = `${Date.now()}-${generateRandomString()}.${imageExt}`;
    const fileDir = join(imagesDir, imageName);

    return new Promise<RecipeImage>((resolve) => {
      fs.writeFile(fileDir, downloadedImage, () => {});

      const newImage = this.dataSource.manager.create<RecipeImage>(RecipeImage, {
        ...(recipeId ? { recipe: { id: recipeId } } : null),
        name: imageName,
      });

      resolve(newImage);
    });
  }

  private async deleteImage(image: RecipeImage): Promise<void> {
    const fileDir = join(imagesDir, image.name);

    await this.dataSource.manager.delete<RecipeImage>(RecipeImage, {
      id: image.id,
    });

    fs.unlink(fileDir, () => {});
  }
}
