import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Migrations_001 implements MigrationInterface {
  private readonly SCHEMA_NAME = 'transactions';
  private readonly TABLE_NAME = 'migrations';

  public async up(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.createTable(
      new Table({
        columns: [
          {
            isGenerated: true,
            isPrimary: true,
            name: 'id',
            type: 'int',
          },
          {
            name: 'classname',
            type: 'varchar',
          },
          {
            name: 'batch',
            type: 'int',
          },
          {
            name: 'executed_at',
            type: 'date',
          },
        ],
        name: `${this.SCHEMA_NAME}.${this.TABLE_NAME}`,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.dropTable(this.TABLE_NAME);
  }
}
