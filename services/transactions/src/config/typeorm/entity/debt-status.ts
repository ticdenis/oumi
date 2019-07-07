import { EntitySchema } from 'typeorm';

export interface DebtStatusEntityType {
  id: number;
  status: string;
}

export const DebtStatusEntity = new EntitySchema<DebtStatusEntityType>({
  columns: {
    id: {
      generated: true,
      primary: true,
      type: Number,
    },
    status: {
      type: String,
      unique: true,
    },
  },
  name: 'debt_status',
  schema: 'transactions',
  tableName: 'debts_statuses',
});
