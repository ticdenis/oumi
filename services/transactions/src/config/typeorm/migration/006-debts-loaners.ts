import { Oumi } from '@oumi-package/shared/lib/core';

import { QueryRunner, Table } from 'typeorm';

export class DebtsLoaners_006 implements Oumi.Migration<QueryRunner> {
  public name = DebtsLoaners_006.name;

  private readonly TABLE_NAME = 'debts_loaners';

  public async up(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.createTable(
      new Table({
        columns: [
          {
            name: 'debt_id',
            type: 'uuid',
          },
          {
            name: 'debt_status_id',
            type: 'integer',
          },
          {
            isGenerated: true,
            isPrimary: true,
            name: 'id',
            type: 'integer',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['debt_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            referencedColumnNames: ['id'],
            referencedTableName: 'debts',
          },
          {
            columnNames: ['debt_status_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            referencedColumnNames: ['id'],
            referencedTableName: 'debts_statuses',
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

  public async down(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.dropTable(this.TABLE_NAME);
  }
}
