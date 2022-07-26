import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsers1657984759375 implements MigrationInterface {
  name = 'CreateUsers1657984759375';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tags" RENAME COLUMN "name" TO "nameasdadas"`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL DEFAULT '', "bio" character varying NOT NULL DEFAULT '', "image" character varying NOT NULL DEFAULT '', "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(
      `ALTER TABLE "tags" RENAME COLUMN "nameasdadas" TO "name"`,
    );
  }
}
