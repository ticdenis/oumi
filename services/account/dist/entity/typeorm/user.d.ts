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
export declare const UserEntity: EntitySchema<UserEntityType>;
//# sourceMappingURL=user.d.ts.map
