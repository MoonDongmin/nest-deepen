import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class Init1752127753367 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
