import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateJogos1783044988456 implements MigrationInterface {
    name = 'CreateJogos1783044988456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "jogos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "titulo" character varying NOT NULL, "genero" character varying NOT NULL, "data_lancamento" date NOT NULL, "plataforma" character varying NOT NULL, "preco" numeric NOT NULL, "estudio_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7312a4a154694e761783f910223" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "jogos" ADD CONSTRAINT "FK_9d827be8b29c23e8dc1bf3bb302" FOREIGN KEY ("estudio_id") REFERENCES "estudios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jogos" DROP CONSTRAINT "FK_9d827be8b29c23e8dc1bf3bb302"`);
        await queryRunner.query(`DROP TABLE "jogos"`);
    }

}
