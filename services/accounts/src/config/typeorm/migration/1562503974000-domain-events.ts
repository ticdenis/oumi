import { Oumi } from '@oumi-package/shared/lib/core';

import { QueryRunner, Table } from 'typeorm';

export class DomainEvents1562503974000 implements Oumi.Migration<QueryRunner> {
  public name = DomainEvents1562503974000.name;

  private readonly SCHEMA_NAME = 'accounts';
  private readonly TABLE_NAME = 'domain_events';

  public async up(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.createTable(
      new Table({
        columns: [
          {
            name: 'data',
            type: 'VARCHAR',
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
            type: 'VARCHAR',
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
