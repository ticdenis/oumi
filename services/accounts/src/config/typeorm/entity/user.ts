import { EntitySchema } from 'typeorm';

export interface UserEntityType {
  created_at: Date;
  email: string;
  firstname: string;
  id: string;
  lastname: string;
  nickname: string;
  password: string;
  phone: string;
  updated_at: Date;
}

// tslint:disable-next-line:variable-name
export const UserEntity = new EntitySchema<UserEntityType>({
  columns: {
    created_at: {
      createDate: true,
      type: Date,
    },
    email: {
      type: String,
      unique: true,
    },
    firstname: {
      type: String,
    },
    id: {
      generated: 'uuid',
      primary: true,
      type: String,
    },
    lastname: {
      type: String,
    },
    nickname: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
    },
    updated_at: {
      type: Date,
      updateDate: true,
    },
  },
  name: 'user',
  tableName: 'users',
});
