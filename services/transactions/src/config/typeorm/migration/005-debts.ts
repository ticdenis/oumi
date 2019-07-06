import { Oumi } from '@oumi-package/shared/lib/core';

import { QueryRunner, Table } from 'typeorm';

export class Debts_005 implements Oumi.Migration<QueryRunner> {
  public name = Debts_005.name;

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
            type: 'string',
          },
          {
            name: 'currency_id',
            type: 'integer',
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
            referencedTableName: 'currencies',
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
