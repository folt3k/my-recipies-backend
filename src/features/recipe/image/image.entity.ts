import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Recipe } from '../recipe.entity';

@Entity()
export class RecipeImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  base64: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.images, { nullable: true })
  recipe?: Recipe;
}
