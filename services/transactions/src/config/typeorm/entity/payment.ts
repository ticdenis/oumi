import { EntitySchema } from 'typeorm';

export interface PaymentEntityType {
  debtId: string;
  id: number;
  message: string | null;
  occurredOn: Date;
  quantity: number;
}

export const PaymentEntity = new EntitySchema<PaymentEntityType>({
  columns: {
    debtId: {
      name: 'debt_id',
      type: String,
    },
    id: {
      primary: true,
      type: String,
    },
    message: {
      nullable: true,
      type: String,
    },
    occurredOn: {
      name: 'occurred_on',
      type: Date,
    },
    quantity: {
      type: 'float',
    },
  },
  name: 'payment',
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
  },
  tableName: 'payments',
});
