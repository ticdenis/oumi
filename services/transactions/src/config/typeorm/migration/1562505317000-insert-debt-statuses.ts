import {
  DEBT_COMPLETED_STATUS,
  DEBT_CONFIRMED_STATUS,
  DEBT_DENY_STATUS,
  DEBT_PENDING_STATUS,
  DEBT_SENDED_STATUS,
} from '@oumi-package/movement/lib/domain';
import { Oumi } from '@oumi-package/shared/lib/core';

import { QueryRunner } from 'typeorm';

export class InsertDebtStatuses1562505317000 implements Oumi.Migration<QueryRunner> {
  public name = InsertDebtStatuses1562505317000.name;

  private readonly STATUSES = [
    DEBT_COMPLETED_STATUS,
    DEBT_SENDED_STATUS,
    DEBT_PENDING_STATUS,
    DEBT_CONFIRMED_STATUS,
    DEBT_DENY_STATUS,
  ];

  public async up(queryRunner: QueryRunner): Promise<any> {
    return Promise.all(this.STATUSES.map(status =>
      queryRunner.query(`
        INSERT INTO transactions.debts_statuses ("status")
        VALUES ('${status}');
      `)
    ));
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    return Promise.all(
      this.STATUSES.map(status =>
        queryRunner.query(`
          DELETE FROM transactions.debts_statuses
          WHERE status = '${status}';
        `)
      ),
    );
  }
}
