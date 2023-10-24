import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Recipe } from '../recipe.entity';

@Entity()
export class RecipeImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Recipe, (recipe) => recipe.images, { nullable: true, onDelete: 'CASCADE' })
  recipe?: Recipe;
}
