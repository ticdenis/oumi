import { AggregateRoot } from '@oumi-package/shared/lib/core';

import { UserDomainError } from './user.errors';
import {
  passwordChanged,
  profileUpdated,
  UserEvents,
  userRegistered,
} from './user.events';
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

export interface ChangePasswordInput {
  newPassword: UserPassword;
  oldPassword: UserPassword;
}

export class User extends AggregateRoot<UserEvents> {
  public static create(args: UserConstructor): User {
    const user = new this(args);

    user.recordDomainEvent(
      userRegistered({
        email: user._email.value,
        firstname: user._firstname.value,
        id: user._id.value,
        lastname: user._lastname.value,
        nickname: user._nickname.value,
        phone: user._phone.value,
      }),
    );

    return user;
  }

  private _email: UserEmail;
  private _firstname: UserFirstname;
  private _id: UserId;
  private _lastname: UserLastname;
  private _nickname: UserNickname;
  private _password: UserPassword;
  private _phone: UserPhone;

  constructor(args: UserConstructor) {
    super();

    this._email = args.email;
    this._firstname = args.firstname;
    this._id = args.id;
    this._lastname = args.lastname;
    this._nickname = args.nickname;
    this._password = args.password;
    this._phone = args.phone;
  }

  public updateProfile({
    firstname,
    lastname,
    nickname,
    phone,
  }: UpdateProfileInput): void {
    this._firstname = firstname;
    this._lastname = lastname;
    this._nickname = nickname;
    this._phone = phone;

    this.recordDomainEvent(
      profileUpdated({
        firstname: this._firstname.value,
        id: this._id.value,
        lastname: this._lastname.value,
        nickname: this._nickname.value,
        phone: this._phone.value,
      }),
    );
  }

  public changePassword({
    newPassword,
    oldPassword,
  }: ChangePasswordInput): void {
    if (!this._password.equalsTo(oldPassword)) {
      throw UserDomainError.passwordNotMatch(oldPassword.value);
    }

    this._password = newPassword;

    this.recordDomainEvent(
      passwordChanged({
        id: this._id.value,
      }),
    );
  }

  get email(): UserEmail {
    return this._email;
  }

  get id(): UserId {
    return this._id;
  }

  get firstname(): UserFirstname {
    return this._firstname;
  }

  get lastname(): UserLastname {
    return this._lastname;
  }

  get nickname(): UserNickname {
    return this._nickname;
  }

  get password(): UserPassword {
    return this._password;
  }

  get phone(): UserPhone {
    return this._phone;
  }
}
