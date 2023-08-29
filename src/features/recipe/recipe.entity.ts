import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { RecipeIngredientCategory } from './ingredient/ingredient.entity';
import { RecipeImage } from './image/image.entity';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 200 })
  name: string;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => RecipeIngredientCategory, (ingredientCategory) => ingredientCategory.recipe)
  ingredients: RecipeIngredientCategory[];

  @OneToMany(() => RecipeImage, (image) => image.recipe)
  images: RecipeImage[];
}
