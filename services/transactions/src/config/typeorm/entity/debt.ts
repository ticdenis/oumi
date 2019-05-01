import { EntitySchema } from 'typeorm';

export interface DebtEntityType {
  amount: number;
  concept: string;
  currencyId: number;
  id: string;
  initialDate: Date;
  limitDate: Date;
}

export const DebtEntity = new EntitySchema<DebtEntityType>({
  columns: {
    amount: {
      type: 'float',
    },
    concept: {
      type: String,
    },
    currencyId: {
      name: 'currency_id',
      type: Number,
    },
    id: {
      primary: true,
      type: String,
    },
    initialDate: {
      name: 'initial_date',
      type: Date,
    },
    limitDate: {
      name: 'limit_date',
      type: Date,
    },
  },
  name: 'debt',
  relations: {
    currencyId: {
      joinColumn: {
        referencedColumnName: 'id',
      },
      joinTable: {
        name: 'currencies',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      target: 'currency',
      type: 'one-to-many',
    },
  },
  tableName: 'debts',
});
