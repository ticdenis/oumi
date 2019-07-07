import { MigrationInterface, QueryRunner } from 'typeorm';

export class Schema_000 implements MigrationInterface {
  public static readonly SCHEMA_NAME = 'accounts';

  public async up(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.createSchema(Schema_000.SCHEMA_NAME, true);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.dropSchema(Schema_000.SCHEMA_NAME, true);
  }
}
