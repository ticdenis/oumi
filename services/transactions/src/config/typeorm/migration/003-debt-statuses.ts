import { Oumi } from '@oumi-package/shared/lib/core';

import { QueryRunner, Table } from 'typeorm';

export class DebtStatuses_003 implements Oumi.Migration<QueryRunner> {
  public name = DebtStatuses_003.name;

  private readonly TABLE_NAME = 'debts_statuses';

  public async up(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.createTable(
      new Table({
        columns: [
          {
            isUnique: true,
            name: 'status',
            type: 'string',
          },
          {
            isGenerated: true,
            isPrimary: true,
            name: 'id',
            type: 'integer',
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
