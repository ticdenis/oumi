import { EntitySchema } from 'typeorm';

export interface UserEntityType {
  id: string;
}

export const UserEntity = new EntitySchema<UserEntityType>({
  columns: {
    id: {
      primary: true,
      type: String,
    },
  },
  name: 'user',
  schema: 'transactions',
  tableName: 'users',
});
