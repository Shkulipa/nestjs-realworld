import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDB1657499888488 implements MigrationInterface {
  name = 'SeedDB1657499888488';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tags (name) VALUES ('dragons'), ('coffee'), ('nestjs')`,
    );

    //password($2b$10$kcrDvxkNPzQj/iWN/hVyT.ya7EQW9xDU/iA8uJ0dEqjsRwJQ0vgby): 123456
    await queryRunner.query(
      `INSERT INTO users (username, email, password) VALUES ('test', 'test@gmail.com', '$2b$10$kcrDvxkNPzQj/iWN/hVyT.ya7EQW9xDU/iA8uJ0dEqjsRwJQ0vgby')`,
    );

    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('first-article', 'First article', 'first article description', 'first article body', 'coffee,dragons', 1)`,
    );

    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('second-article', 'Second article', 'second article description', 'second article body', 'coffee,dragons', 1)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('');
  }
}
