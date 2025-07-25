import { MigrationInterface, QueryRunner } from 'typeorm';

export class Test1752127937567 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "test"
                             (
                               id SERIAL
                             )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "test"
    `);
  }
}
