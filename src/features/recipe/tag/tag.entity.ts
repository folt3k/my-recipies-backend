import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RecipeTag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 128, unique: true, nullable: false })
  name: string;
}
