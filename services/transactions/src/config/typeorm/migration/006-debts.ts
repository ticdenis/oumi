import { Oumi } from '@oumi-package/shared/lib/core';

import { QueryRunner, Table } from 'typeorm';

export class Debts_006 implements Oumi.Migration<QueryRunner> {
  public name = Debts_006.name;

  private readonly SCHEMA_NAME = 'transactions';
  private readonly TABLE_NAME = 'debts';

  public async up(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.createTable(
      new Table({
        columns: [
          {
            name: 'amount',
            type: 'float',
          },
          {
            name: 'concept',
            type: 'varchar',
          },
          {
            name: 'currency_id',
            type: 'int',
          },
          {
            isPrimary: true,
            name: 'id',
            type: 'uuid',
          },
          {
            name: 'initial_date',
            type: 'date',
          },
          {
            name: 'limit_date',
            type: 'date',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['currency_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            referencedColumnNames: ['id'],
            referencedTableName: `${this.SCHEMA_NAME}.currencies`,
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
