import { DomainEventPublisher } from '@oumi-package/shared';

import { userRegistered } from './bus/event/user-registered';
import {
  UserEmail,
  UserFirstname,
  UserId,
  UserLastname,
  UserPassword,
} from './value-object';

export interface UserConstructor {
  email: UserEmail;
  firstname: UserFirstname;
  id: UserId;
  lastname: UserLastname;
  password: UserPassword;
}

export class User {
  public static create(args: UserConstructor): User {
    const user = new this(args);

    DomainEventPublisher.instance().publish(
      userRegistered({
        email: user._email.value,
        firstname: user._firstname.value,
        id: user._id.value,
        lastname: user._lastname.value,
      }),
    );

    return user;
  }

  private _id: UserId;
  private _firstname: UserFirstname;
  private _lastname: UserLastname;
  private _email: UserEmail;
  private _password: UserPassword;

  constructor(args: UserConstructor) {
    this._id = args.id;
    this._firstname = args.firstname;
    this._lastname = args.lastname;
    this._email = args.email;
    this._password = args.password;
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
}
