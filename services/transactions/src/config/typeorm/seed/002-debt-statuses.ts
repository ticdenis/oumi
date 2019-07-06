import {
  DEBT_COMPLETED_STATUS,
  DEBT_CONFIRMED_STATUS,
  DEBT_DENY_STATUS,
  DEBT_PENDING_STATUS,
  DEBT_SENDED_STATUS,
} from '@oumi-package/movement/lib/domain';
import { Oumi } from '@oumi-package/shared/lib/core';

import { QueryRunner } from 'typeorm';

import { DebtStatusEntity } from '../entity/debt-status';

export class DebtStatuses_002 implements Oumi.Migration<QueryRunner> {
  public name = DebtStatuses_002.name;

  private readonly STATUSES = [
    DEBT_COMPLETED_STATUS,
    DEBT_SENDED_STATUS,
    DEBT_PENDING_STATUS,
    DEBT_CONFIRMED_STATUS,
    DEBT_DENY_STATUS,
  ];

  public async up(queryRunner: QueryRunner): Promise<any> {
    return Promise.all(
      this.STATUSES.map(status =>
        queryRunner.manager.getRepository(DebtStatusEntity).insert({
          status,
        }),
      ),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    return Promise.all(
      this.STATUSES.map(status =>
        queryRunner.manager.delete(DebtStatusEntity, {
          where: {
            status,
          },
        }),
      ),
    );
  }
}
