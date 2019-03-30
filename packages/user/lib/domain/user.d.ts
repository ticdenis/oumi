import { AggregateRoot } from '@oumi-package/core';
import { UserEvents } from './user.events';
import {
  UserEmail,
  UserFirstname,
  UserId,
  UserLastname,
  UserNickname,
  UserPassword,
  UserPhone,
} from './user.props';
export interface UserConstructor {
  email: UserEmail;
  firstname: UserFirstname;
  id: UserId;
  lastname: UserLastname;
  nickname: UserNickname;
  password: UserPassword;
  phone: UserPhone;
}
export interface UpdateProfileInput {
  firstname: UserFirstname;
  lastname: UserLastname;
  nickname: UserNickname;
  phone: UserPhone;
}
export declare class User extends AggregateRoot<UserEvents> {
  static create(args: UserConstructor): User;
  private _email;
  private _firstname;
  private _id;
  private _lastname;
  private _nickname;
  private _password;
  private _phone;
  constructor(args: UserConstructor);
  updateProfile({
    firstname,
    lastname,
    nickname,
    phone,
  }: UpdateProfileInput): void;
  readonly email: UserEmail;
  readonly id: UserId;
  readonly firstname: UserFirstname;
  readonly lastname: UserLastname;
  readonly nickname: UserNickname;
  readonly password: UserPassword;
  readonly phone: UserPhone;
}
//# sourceMappingURL=user.d.ts.map
