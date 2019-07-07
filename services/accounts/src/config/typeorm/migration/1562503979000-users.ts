import { Oumi } from '@oumi-package/shared/lib/core';

import { QueryRunner, Table } from 'typeorm';

export class Users1562503979000 implements Oumi.Migration<QueryRunner> {
  public name = Users1562503979000.name;

  private readonly SCHEMA_NAME = 'accounts';
  private readonly TABLE_NAME = 'users';

  public up(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.createTable(
      new Table({
        columns: [
          {
            name: 'created_at',
            type: 'date',
          },
          {
            isUnique: true,
            name: 'email',
            type: 'VARCHAR',
          },
          {
            name: 'firstname',
            type: 'VARCHAR',
          },
          {
            isPrimary: true,
            name: 'id',
            type: 'uuid',
          },
          {
            name: 'lastname',
            type: 'VARCHAR',
          },
          {
            isUnique: true,
            name: 'nickname',
            type: 'VARCHAR',
          },
          {
            name: 'password',
            type: 'VARCHAR',
          },
          {
            name: 'phone',
            type: 'VARCHAR',
          },
          {
            name: 'updated_at',
            type: 'date',
          },
        ],
        name: `${this.SCHEMA_NAME}.${this.TABLE_NAME}`,
      }),
    );
  }

  public down(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.dropTable(this.TABLE_NAME);
  }
}
