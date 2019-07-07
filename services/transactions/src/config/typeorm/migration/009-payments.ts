import { Oumi } from '@oumi-package/shared/lib/core';

import { QueryRunner, Table } from 'typeorm';

export class Payments_009 implements Oumi.Migration<QueryRunner> {
  public name = Payments_009.name;

  private readonly SCHEMA_NAME = 'transactions';
  private readonly TABLE_NAME = 'payments';

  public async up(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.createTable(
      new Table({
        columns: [
          {
            name: 'debt_id',
            type: 'uuid',
          },
          {
            isPrimary: true,
            name: 'id',
            type: 'uuid',
          },
          {
            isNullable: true,
            name: 'message',
            type: 'varchar',
          },
          {
            name: 'occurred_on',
            type: 'date',
          },
          {
            name: 'quantity',
            type: 'float',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['debt_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            referencedColumnNames: ['id'],
            referencedTableName: `${this.SCHEMA_NAME}.debts`,
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
