import { AggregateRoot } from '@oumi-package/shared';

import { UserEvents, userRegistered } from './user.events';
import {
  UserEmail,
  UserFirstname,
  UserId,
  UserLastname,
  UserPassword,
  UserPhone,
} from './user.props';

export interface UserConstructor {
  email: UserEmail;
  firstname: UserFirstname;
  id: UserId;
  lastname: UserLastname;
  password: UserPassword;
  phone: UserPhone;
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
        phone: user._phone.value,
      }),
    );

    return user;
  }

  private _id: UserId;
  private _firstname: UserFirstname;
  private _lastname: UserLastname;
  private _email: UserEmail;
  private _password: UserPassword;
  private _phone: UserPhone;

  constructor(args: UserConstructor) {
    super();

    this._id = args.id;
    this._firstname = args.firstname;
    this._lastname = args.lastname;
    this._email = args.email;
    this._password = args.password;
    this._phone = args.phone;
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

  get email(): UserEmail {
    return this._email;
  }

  get password(): UserPassword {
    return this._password;
  }

  get phone(): UserPhone {
    return this._phone;
  }
}
