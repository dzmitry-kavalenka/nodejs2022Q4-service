import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTracks1676215318306 implements MigrationInterface {
  name = 'CreateTracks1676215318306';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tracks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artistId" uuid, "albumId" uuid, "duration" integer NOT NULL, CONSTRAINT "PK_242a37ffc7870380f0e611986e8" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tracks"`);
  }
}
