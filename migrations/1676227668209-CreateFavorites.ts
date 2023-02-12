import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFavorites1676227668209 implements MigrationInterface {
  name = 'CreateFavorites1676227668209';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "artists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_09b823d4607d2675dc4ffa82261" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "albums" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" uuid, "artistIdId" uuid, CONSTRAINT "PK_838ebae24d2e12082670ffc95d7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favorites" ("id" SERIAL NOT NULL, "artists" character array NOT NULL DEFAULT '{}', "albums" character array NOT NULL DEFAULT '{}', "tracks" character array NOT NULL DEFAULT '{}', "artistsId" uuid, "albumsId" uuid, "tracksId" uuid, CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "tracks" ADD "artistIdId" uuid`);
    await queryRunner.query(`ALTER TABLE "tracks" ADD "albumIdId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "albums" ADD CONSTRAINT "FK_f74d24b7a35551b0c9cc650be11" FOREIGN KEY ("artistIdId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_9b1a336159819e6518395fa0a18" FOREIGN KEY ("artistIdId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_22860a4820e8a80b73be4dc15bb" FOREIGN KEY ("albumIdId") REFERENCES "albums"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" ADD CONSTRAINT "FK_0f704a910a9b76754e1db51dcc7" FOREIGN KEY ("artistsId") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" ADD CONSTRAINT "FK_329c0ac069808cc5e05e5cbb870" FOREIGN KEY ("albumsId") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" ADD CONSTRAINT "FK_372f735007bad1a3c1c02c82f3a" FOREIGN KEY ("tracksId") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "favorites" DROP CONSTRAINT "FK_372f735007bad1a3c1c02c82f3a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" DROP CONSTRAINT "FK_329c0ac069808cc5e05e5cbb870"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" DROP CONSTRAINT "FK_0f704a910a9b76754e1db51dcc7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_22860a4820e8a80b73be4dc15bb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_9b1a336159819e6518395fa0a18"`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" DROP CONSTRAINT "FK_f74d24b7a35551b0c9cc650be11"`,
    );
    await queryRunner.query(`ALTER TABLE "tracks" DROP COLUMN "albumIdId"`);
    await queryRunner.query(`ALTER TABLE "tracks" DROP COLUMN "artistIdId"`);
    await queryRunner.query(`DROP TABLE "favorites"`);
    await queryRunner.query(`DROP TABLE "albums"`);
    await queryRunner.query(`DROP TABLE "artists"`);
  }
}
