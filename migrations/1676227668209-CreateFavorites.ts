import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFavorites1676227668209 implements MigrationInterface {
  name = 'CreateFavorites1676227668209';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "favorites" ("id" SERIAL NOT NULL, "artists" character array NOT NULL DEFAULT '{}', "albums" character array NOT NULL DEFAULT '{}', "tracks" character array NOT NULL DEFAULT '{}', "artistsId" uuid, "albumsId" uuid, "tracksId" uuid, CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id"))`,
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
    await queryRunner.query(`DROP TABLE "favorites"`);
  }
}
