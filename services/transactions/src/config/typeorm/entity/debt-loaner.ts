import { EntitySchema } from 'typeorm';

export interface DebtLoanerEntityType {
  debtId: string;
  debtStatusId: number;
  id: number;
  userId: string;
}

export const DebtLoanerEntity = new EntitySchema<DebtLoanerEntityType>({
  columns: {
    debtId: {
      name: 'debt_id',
      type: String,
    },
    debtStatusId: {
      name: 'debt_status_id',
      type: Number,
    },
    id: {
      generated: true,
      primary: true,
      type: Number,
    },
    userId: {
      name: 'user_id',
      type: String,
    },
  },
  name: 'debt_loaner',
  relations: {
    debtId: {
      joinColumn: {
        referencedColumnName: 'id',
      },
      joinTable: {
        name: 'debts',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      target: 'debt',
      type: 'one-to-many',
    },
    debtStatusId: {
      joinColumn: {
        referencedColumnName: 'id',
      },
      joinTable: {
        name: 'debts_statuses',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      target: 'debt_status',
      type: 'one-to-many',
    },
    userId: {
      joinColumn: {
        referencedColumnName: 'id',
      },
      joinTable: {
        name: 'users',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      target: 'user',
      type: 'one-to-many',
    },
  },
  schema: 'transactions',
  tableName: 'debts_loaners',
});
