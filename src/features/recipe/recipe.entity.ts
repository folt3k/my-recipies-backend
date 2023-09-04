import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { RecipeImage } from './image/image.entity';
import { RecipeIngredientsGroup, RecipeIngredient } from './ingredient/ingredient.types';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 200 })
  name: string;

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
}
