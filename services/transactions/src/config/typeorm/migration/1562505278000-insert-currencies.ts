import { Oumi } from '@oumi-package/shared/lib/core';

import { QueryRunner } from 'typeorm';

export class InsertCurrencies1562505278000 implements Oumi.Migration<QueryRunner> {
  public name = InsertCurrencies1562505278000.name;

  private readonly CURRENCIES = [
    { code: 'EUR', symbol: '€' },
    { code: 'USD', symbol: '$' },
  ];

  public async up(queryRunner: QueryRunner): Promise<any> {
    return Promise.all(this.CURRENCIES.map(currency =>
      queryRunner.query(`
        INSERT INTO transactions.currencies (code, symbol)
        VALUES ('${currency.code}', '${currency.symbol}');
      `)
    ));
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    return Promise.all(
      this.CURRENCIES.map(currency =>
        queryRunner.query(`
          DELETE FROM transactions.currencies
          WHERE code = '${currency.code}' AND symbol = '${currency.symbol}';
        `)
      ),
    );
  }
}
