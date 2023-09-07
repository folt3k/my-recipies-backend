import { Injectable } from '@nestjs/common';
import { DataSource, In } from 'typeorm';
import { CreateTagDto } from './tag.dto';
import { RecipeTag } from './tag.entity';

@Injectable()
export class RecipeTagService {
  constructor(private dataSource: DataSource) {}

  async saveAll(tags: CreateTagDto[]): Promise<RecipeTag[]> {
    const existedTags = await this.dataSource.manager.find(RecipeTag, {
      where: {
        name: In(tags.map((tag) => tag.name)),
      },
    });
    const mappedExistedTags = existedTags.map((tag) => tag.name);

    const newTags = tags
      .filter((tag) => !mappedExistedTags.includes(tag.name))
      .map((tag) => this.dataSource.manager.create<RecipeTag>(RecipeTag, tag));

    const savedTags = await this.dataSource.manager.save(newTags);

    return [...savedTags, ...existedTags];
  }
}
