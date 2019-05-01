import { Oumi } from '@oumi-package/shared/lib/core';

import { QueryRunner, Table } from 'typeorm';

export class Contacts_003 implements Oumi.Migration<QueryRunner> {
  public name = Contacts_003.name;

  private readonly TABLE_NAME = 'contacts';

  public up(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.createTable(
      new Table({
        columns: [
          {
            name: 'contact_id',
            type: 'uuid',
          },
          {
            isGenerated: true,
            isPrimary: true,
            name: 'id',
            type: 'integer',
          },
          {
            isNullable: true,
            name: 'message',
            type: 'string',
          },
          {
            name: 'status',
            type: 'string',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['contact_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
          },
          {
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
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
