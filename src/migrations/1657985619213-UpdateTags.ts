import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTags1657985619213 implements MigrationInterface {
  name = 'UpdateTags1657985619213';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tags" RENAME COLUMN "nameasdadas" TO "name"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tags" RENAME COLUMN "name" TO "nameasdadas"`,
    );
  }
}
