import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Migrations_000 implements MigrationInterface {
  private readonly TABLE_NAME = 'migrations';

  public async up(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.createTable(
      new Table({
        columns: [
          {
            isGenerated: true,
            isPrimary: true,
            name: 'id',
            type: 'integer',
          },
          {
            name: 'classname',
            type: 'string',
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
        name: this.TABLE_NAME,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.dropTable(this.TABLE_NAME);
  }
}
