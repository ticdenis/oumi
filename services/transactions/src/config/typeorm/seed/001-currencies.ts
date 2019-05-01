import { Oumi } from '@oumi-package/shared/lib/core';

import { QueryRunner } from 'typeorm';

import { CurrencyEntity } from '../entity/currency';

export class Currencies_001 implements Oumi.Migration<QueryRunner> {
  public name = Currencies_001.name;

  private readonly CURRENCIES = [
    { code: 'EUR', symbol: '€' },
    { code: 'USD', symbol: '$' },
  ];

  public async up(queryRunner: QueryRunner): Promise<any> {
    return Promise.all(
      this.CURRENCIES.map(currency =>
        queryRunner.manager.getRepository(CurrencyEntity).insert(currency),
      ),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    return Promise.all(
      this.CURRENCIES.map(currency =>
        queryRunner.manager.delete(CurrencyEntity, {
          where: currency,
        }),
      ),
    );
  }
}
