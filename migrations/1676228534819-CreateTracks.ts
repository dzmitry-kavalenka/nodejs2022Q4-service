import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTracks1676228534819 implements MigrationInterface {
  name = 'CreateTracks1676228534819';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tracks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artistId" uuid, "albumId" uuid, "duration" integer NOT NULL, "artistIdId" uuid, "albumIdId" uuid, CONSTRAINT "PK_242a37ffc7870380f0e611986e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_9b1a336159819e6518395fa0a18" FOREIGN KEY ("artistIdId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_22860a4820e8a80b73be4dc15bb" FOREIGN KEY ("albumIdId") REFERENCES "albums"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_22860a4820e8a80b73be4dc15bb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_9b1a336159819e6518395fa0a18"`,
    );
    await queryRunner.query(`DROP TABLE "tracks"`);
  }
}
