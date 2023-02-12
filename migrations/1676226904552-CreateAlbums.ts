import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAlbums1676226904552 implements MigrationInterface {
  name = 'CreateAlbums1676226904552';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "albums" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" uuid, "artistIdId" uuid, CONSTRAINT "PK_838ebae24d2e12082670ffc95d7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" ADD CONSTRAINT "FK_f74d24b7a35551b0c9cc650be11" FOREIGN KEY ("artistIdId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "albums" DROP CONSTRAINT "FK_f74d24b7a35551b0c9cc650be11"`,
    );
    await queryRunner.query(`DROP TABLE "albums"`);
  }
}
