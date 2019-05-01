import { Oumi } from '@oumi-package/shared/lib/core';

import { QueryRunner, Table } from 'typeorm';

export class Currencies_002 implements Oumi.Migration<QueryRunner> {
  public name = Currencies_002.name;

  private readonly TABLE_NAME = 'currencies';

  public async up(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.createTable(
      new Table({
        columns: [
          {
            isUnique: true,
            name: 'code',
            type: 'string',
          },
          {
            isGenerated: true,
            isPrimary: true,
            name: 'id',
            type: 'integer',
          },
          {
            name: 'symbol',
            type: 'string',
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
