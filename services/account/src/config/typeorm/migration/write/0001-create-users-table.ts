import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
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
            name: 'nickname',
            type: 'string',
          },
          {
            name: 'password',
            type: 'string',
          },
          {
            name: 'updated_at',
            type: 'date',
          },
        ],
        name: `users`,
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(`users`, true, true, true);
  }
}
