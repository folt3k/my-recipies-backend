import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeImageModel1696277819270 implements MigrationInterface {
  name = 'ChangeImageModel1696277819270';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "recipe_image" RENAME COLUMN "base64" TO "name"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "recipe_image" RENAME COLUMN "name" TO "base64"`);
  }
}
