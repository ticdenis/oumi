import { EntitySchema } from 'typeorm';

export interface CurrencyEntityType {
  code: string;
  id: number;
  symbol: string;
}

export const CurrencyEntity = new EntitySchema<CurrencyEntityType>({
  columns: {
    code: {
      type: String,
      unique: true,
    },
    id: {
      generated: true,
      primary: true,
      type: Number,
    },
    symbol: {
      type: String,
    },
  },
  name: 'currency',
  schema: 'transactions',
  tableName: 'currencies',
});
