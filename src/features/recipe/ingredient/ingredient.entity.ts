import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Recipe } from '../recipe.entity';

@Entity()
export class RecipeIngredientCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 256 })
  name: string;

  @OneToMany(() => RecipeIngredient, (ingredient) => ingredient.category, { cascade: true, eager: true })
  ingredients: RecipeIngredient[];

  @ManyToOne(() => Recipe, (recipe) => recipe.ingredientCategories)
  recipe: Recipe;
}

@Entity()
export class RecipeIngredient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 256 })
  name: string;

  @ManyToOne(() => RecipeIngredientCategory, (category) => category.ingredients)
  category: RecipeIngredientCategory;
}
