import { Oumi } from '@oumi-package/shared/lib/core';

import { QueryRunner, Table } from 'typeorm';

export class DebtStatuses1562505304000 implements Oumi.Migration<QueryRunner> {
  public name = DebtStatuses1562505304000.name;

  private readonly SCHEMA_NAME = 'transactions';
  private readonly TABLE_NAME = 'debts_statuses';

  public async up(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.createTable(
      new Table({
        columns: [
          {
            isUnique: true,
            name: 'status',
            type: 'varchar',
          },
          {
            isGenerated: true,
            isPrimary: true,
            name: 'id',
            type: 'int',
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
