import { EventPublisher } from '@oumi-package/core';
import { Either } from 'fp-ts/lib/Either';
import {
  UserCommandRepository,
  UserDomainError,
  UserEmail,
  UserFirstname,
  UserId,
  UserLastname,
  UserNickname,
  UserPassword,
  UserPhone,
  UserQueryRepository,
} from '../../domain';
export declare type UserRegistrationService = (input: {
  email: UserEmail;
  firstname: UserFirstname;
  id: UserId;
  lastname: UserLastname;
  nickname: UserNickname;
  password: UserPassword;
  phone: UserPhone;
}) => Promise<Either<UserDomainError, void>>;
export declare type UserRegistrationBuilder = (options: {
  commandRepository: UserCommandRepository;
  eventPublisher: EventPublisher;
  queryRepository: UserQueryRepository;
}) => UserRegistrationService;
export declare const userRegistrationBuilderService: UserRegistrationBuilder;
//# sourceMappingURL=user-registration.service.d.ts.map
