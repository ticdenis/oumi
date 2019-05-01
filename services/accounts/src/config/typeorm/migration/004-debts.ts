import { Oumi } from '@oumi-package/shared/lib/core';

import { QueryRunner, Table } from 'typeorm';

export class Debts_004 implements Oumi.Migration<QueryRunner> {
  public name = Debts_004.name;

  private readonly TABLE_NAME = 'debts';

  public up(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.createTable(
      new Table({
        columns: [
          {
            name: 'amount',
            type: 'float',
          },
          {
            name: 'code',
            type: 'string',
          },
          {
            name: 'contact_id',
            type: 'uuid',
          },
          {
            name: 'currency',
            type: 'string',
          },
          {
            isPrimary: true,
            name: 'id',
            type: 'uuid',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['contact_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
          },
          {
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
          },
        ],
        name: this.TABLE_NAME,
      }),
    );
  }

  public down(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.dropTable(this.TABLE_NAME);
  }
}
