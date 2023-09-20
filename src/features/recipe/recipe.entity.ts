import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { RecipeImage } from './image/image.entity';
import { RecipeIngredientsGroup, RecipeIngredient } from './ingredient/ingredient.types';
import { RecipeTag } from './tag/tag.entity';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 200 })
  name: string;

  @Column('varchar', { length: 1024 })
  description: string;

  @Column('text')
  content: string;

  @Column('json')
  ingredients: RecipeIngredientsGroup[] | RecipeIngredient[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => RecipeImage, (image) => image.recipe, { eager: true })
  images: RecipeImage[];

  @ManyToMany(() => RecipeTag, { eager: true })
  @JoinTable()
  tags: RecipeTag[];
}
