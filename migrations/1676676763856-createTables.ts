import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTables1676676763856 implements MigrationInterface {
  name = 'createTables1676676763856';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "artists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_09b823d4607d2675dc4ffa82261" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "albums" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "PK_838ebae24d2e12082670ffc95d7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tracks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" integer NOT NULL, "artistId" uuid, "albumId" uuid, CONSTRAINT "PK_242a37ffc7870380f0e611986e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favorites" ("id" SERIAL NOT NULL, "artistId" uuid, "albumId" uuid, "trackId" uuid, CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "version" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "password" character varying NOT NULL, "refreshToken" character varying, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" ADD CONSTRAINT "FK_ed378d7c337efd4d5c8396a77a1" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_62f595181306916265849fced48" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_5c52e761792791f57de2fec342d" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" ADD CONSTRAINT "FK_ab924fec72ca49ca75cdadbe33a" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" ADD CONSTRAINT "FK_794871b05fec44a9dd285726809" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" ADD CONSTRAINT "FK_cbb0b85b9864f77a7ccba2aad46" FOREIGN KEY ("trackId") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "favorites" DROP CONSTRAINT "FK_cbb0b85b9864f77a7ccba2aad46"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" DROP CONSTRAINT "FK_794871b05fec44a9dd285726809"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" DROP CONSTRAINT "FK_ab924fec72ca49ca75cdadbe33a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_5c52e761792791f57de2fec342d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_62f595181306916265849fced48"`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" DROP CONSTRAINT "FK_ed378d7c337efd4d5c8396a77a1"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "favorites"`);
    await queryRunner.query(`DROP TABLE "tracks"`);
    await queryRunner.query(`DROP TABLE "albums"`);
    await queryRunner.query(`DROP TABLE "artists"`);
  }
}
