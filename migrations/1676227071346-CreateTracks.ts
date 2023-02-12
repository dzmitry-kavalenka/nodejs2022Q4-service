import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTracks1676227071346 implements MigrationInterface {
  name = 'CreateTracks1676227071346';

  public async up(queryRunner: QueryRunner): Promise<void> {
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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
    await queryRunner.query(`DROP TABLE "tracks"`);
  }
}
