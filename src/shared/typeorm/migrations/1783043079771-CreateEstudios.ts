import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEstudios1783043079771 implements MigrationInterface {
    name = 'CreateEstudios1783043079771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "estudios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "pais" character varying NOT NULL, "ano_fundacao" integer NOT NULL, "fundador" character varying NOT NULL, "website" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d7791f4a9b2e2d998de26af94e5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "estudios"`);
    }

}
