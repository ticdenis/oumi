import { Oumi } from '@oumi-package/shared/lib/core';

import { QueryRunner, Table } from 'typeorm';

export class Currencies_003 implements Oumi.Migration<QueryRunner> {
  public name = Currencies_003.name;

  private readonly SCHEMA_NAME = 'transactions';
  private readonly TABLE_NAME = 'currencies';

  public async up(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.createTable(
      new Table({
        columns: [
          {
            isUnique: true,
            name: 'code',
            type: 'varchar',
          },
          {
            isGenerated: true,
            isPrimary: true,
            name: 'id',
            type: 'int',
          },
          {
            name: 'symbol',
            type: 'varchar',
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
