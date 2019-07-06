import { Oumi } from '@oumi-package/shared/lib/core';

import { QueryRunner, Table } from 'typeorm';

export class Users_002 implements Oumi.Migration<QueryRunner> {
  public name = Users_002.name;

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
            type: 'string',
          },
          {
            name: 'firstname',
            type: 'string',
          },
          {
            isPrimary: true,
            name: 'id',
            type: 'uuid',
          },
          {
            name: 'lastname',
            type: 'string',
          },
          {
            isUnique: true,
            name: 'nickname',
            type: 'string',
          },
          {
            name: 'password',
            type: 'string',
          },
          {
            name: 'phone',
            type: 'string',
          },
          {
            name: 'updated_at',
            type: 'date',
          },
        ],
        name: this.TABLE_NAME,
      }),
    );
  }

  public down(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.dropTable(this.TABLE_NAME);
  }
}
