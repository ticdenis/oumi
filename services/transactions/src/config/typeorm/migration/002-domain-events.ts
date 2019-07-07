import { Oumi } from '@oumi-package/shared/lib/core';

import { QueryRunner, Table } from 'typeorm';

export class DomainEvents_002 implements Oumi.Migration<QueryRunner> {
  public name = DomainEvents_002.name;

  private readonly SCHEMA_NAME = 'transactions';
  private readonly TABLE_NAME = 'domain_events';

  public async up(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.createTable(
      new Table({
        columns: [
          {
            name: 'data',
            type: 'varchar',
          },
          {
            isPrimary: true,
            name: 'id',
            type: 'uuid',
          },
          {
            name: 'occurred_on',
            type: 'date',
          },
          {
            name: 'type',
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
