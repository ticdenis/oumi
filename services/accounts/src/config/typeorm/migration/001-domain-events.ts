import { Oumi } from '@oumi-package/shared/lib/core';

import { QueryRunner, Table } from 'typeorm';

export class DomainEvents_001 implements Oumi.Migration<QueryRunner> {
  public name = DomainEvents_001.name;

  private readonly TABLE_NAME = 'domain_events';

  public async up(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.createTable(
      new Table({
        columns: [
          {
            name: 'data',
            type: 'string',
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
