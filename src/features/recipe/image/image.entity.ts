import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Recipe } from '../recipe.entity';

@Entity()
export class RecipeImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 1024 })
  url: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.images, { nullable: true })
  recipe?: Recipe;
}
