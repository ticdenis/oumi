import { Oumi } from '@oumi-package/shared/lib/core';

import { QueryRunner, Table } from 'typeorm';

export class DebtsLoaners_007 implements Oumi.Migration<QueryRunner> {
  public name = DebtsLoaners_007.name;

  private readonly SCHEMA_NAME = 'transactions';
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
            type: 'int',
          },
          {
            isGenerated: true,
            isPrimary: true,
            name: 'id',
            type: 'int',
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
            referencedTableName: `${this.SCHEMA_NAME}.debts`,
          },
          {
            columnNames: ['debt_status_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            referencedColumnNames: ['id'],
            referencedTableName: `${this.SCHEMA_NAME}.debts_statuses`,
          },
          {
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            referencedColumnNames: ['id'],
            referencedTableName: `${this.SCHEMA_NAME}.users`,
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
