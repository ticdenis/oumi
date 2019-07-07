import { Oumi } from '@oumi-package/shared/lib/core';

import { QueryRunner, Table } from 'typeorm';

export class Contacts_004 implements Oumi.Migration<QueryRunner> {
  public name = Contacts_004.name;

  private readonly SCHEMA_NAME = 'accounts';
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
            type: 'int',
          },
          {
            isNullable: true,
            name: 'message',
            type: 'VARCHAR',
          },
          {
            name: 'status',
            type: 'VARCHAR',
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
            referencedTableName: `${this.SCHEMA_NAME}.users`,
          },
          {
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            referencedColumnNames: ['id'],
            referencedTableName: `${this.SCHEMA_NAME}.users`,
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
