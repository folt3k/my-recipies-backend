import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreatedAtFieldToRecipeImage1696785481904 implements MigrationInterface {
  name = 'AddCreatedAtFieldToRecipeImage1696785481904';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "recipe_image" ADD "createdAt" TIMESTAMP DEFAULT now()`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "recipe_image" DROP COLUMN "createdAt"`);
  }
}
