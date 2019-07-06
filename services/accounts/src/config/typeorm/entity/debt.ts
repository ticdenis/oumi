import { EntitySchema } from 'typeorm';

export interface DebtEntityType {
  amount: number;
  code: string;
  contactId: string;
  currency: string;
  userId: string;
}

export const DebtEntity = new EntitySchema<DebtEntityType & { id: string }>({
  columns: {
    amount: {
      type: Number,
    },
    code: {
      type: String,
    },
    contactId: {
      name: 'contact_id',
      type: String,
    },
    currency: {
      type: String,
    },
    id: {
      generated: 'uuid',
      primary: true,
      type: String,
    },
    userId: {
      name: 'user_id',
      type: String,
    },
  },
  name: 'debt',
  relations: {
    contactId: {
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
  tableName: 'debts',
});
