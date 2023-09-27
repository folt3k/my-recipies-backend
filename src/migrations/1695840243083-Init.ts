import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1695840243083 implements MigrationInterface {
    name = 'Init1695840243083'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recipe_image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "base64" text NOT NULL, "recipeId" uuid, CONSTRAINT "PK_3e9df582c34e726c873740baaa5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipe_tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, CONSTRAINT "UQ_b67f9bb9cb62daf675902fd3e5b" UNIQUE ("name"), CONSTRAINT "PK_196d05ddda1749dac07f1654c79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipe" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "description" character varying(1024), "content" text NOT NULL, "ingredients" json NOT NULL, "hasIngredientCategories" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipe_tags_recipe_tag" ("recipeId" uuid NOT NULL, "recipeTagId" uuid NOT NULL, CONSTRAINT "PK_4ba643966232ecc508dce1861aa" PRIMARY KEY ("recipeId", "recipeTagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_847c56d24f7dd7952d88709283" ON "recipe_tags_recipe_tag" ("recipeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2f2e5105ae5bfc1b409cd0bd54" ON "recipe_tags_recipe_tag" ("recipeTagId") `);
        await queryRunner.query(`ALTER TABLE "recipe_image" ADD CONSTRAINT "FK_d1130c698254134c0cd22507b97" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_tags_recipe_tag" ADD CONSTRAINT "FK_847c56d24f7dd7952d887092839" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "recipe_tags_recipe_tag" ADD CONSTRAINT "FK_2f2e5105ae5bfc1b409cd0bd543" FOREIGN KEY ("recipeTagId") REFERENCES "recipe_tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe_tags_recipe_tag" DROP CONSTRAINT "FK_2f2e5105ae5bfc1b409cd0bd543"`);
        await queryRunner.query(`ALTER TABLE "recipe_tags_recipe_tag" DROP CONSTRAINT "FK_847c56d24f7dd7952d887092839"`);
        await queryRunner.query(`ALTER TABLE "recipe_image" DROP CONSTRAINT "FK_d1130c698254134c0cd22507b97"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2f2e5105ae5bfc1b409cd0bd54"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_847c56d24f7dd7952d88709283"`);
        await queryRunner.query(`DROP TABLE "recipe_tags_recipe_tag"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "recipe"`);
        await queryRunner.query(`DROP TABLE "recipe_tag"`);
        await queryRunner.query(`DROP TABLE "recipe_image"`);
    }

}
