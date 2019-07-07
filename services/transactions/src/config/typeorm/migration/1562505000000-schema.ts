import { Oumi } from '@oumi-package/shared/lib/core';

import { QueryRunner } from 'typeorm';

export class Schema1562505000000 implements Oumi.Migration<QueryRunner> {

  public static readonly SCHEMA_NAME = 'transactions';
  public name = Schema1562505000000.name;

  public async up(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.createSchema(Schema1562505000000.SCHEMA_NAME, true);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.dropSchema(Schema1562505000000.SCHEMA_NAME, true);
  }
}
