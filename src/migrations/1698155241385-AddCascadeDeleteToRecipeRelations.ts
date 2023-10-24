import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCascadeDeleteToRecipeRelations1698155241385 implements MigrationInterface {
  name = 'AddCascadeDeleteToRecipeRelations1698155241385';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "recipe_image" DROP CONSTRAINT "FK_d1130c698254134c0cd22507b97"`);
    await queryRunner.query(
      `ALTER TABLE "recipe_image" ADD CONSTRAINT "FK_d1130c698254134c0cd22507b97" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "recipe_image" DROP CONSTRAINT "FK_d1130c698254134c0cd22507b97"`);
    await queryRunner.query(
      `ALTER TABLE "recipe_image" ADD CONSTRAINT "FK_d1130c698254134c0cd22507b97" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
