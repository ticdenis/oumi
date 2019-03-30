import { EventPublisher } from '@oumi-package/core';
import { Either } from 'fp-ts/lib/Either';
import {
  UserCommandRepository,
  UserDomainError,
  UserFirstname,
  UserId,
  UserLastname,
  UserNickname,
  UserPhone,
  UserQueryRepository,
} from '../../domain';
export declare type UpdateProfileService = (input: {
  id: UserId;
  nickname: UserNickname;
  firstname: UserFirstname;
  lastname: UserLastname;
  phone: UserPhone;
}) => Promise<Either<UserDomainError, void>>;
export declare type UpdateProfileBuilder = (options: {
  commandRepository: UserCommandRepository;
  eventPublisher: EventPublisher;
  queryRepository: UserQueryRepository;
}) => UpdateProfileService;
export declare const updateProfileBuilderService: UpdateProfileBuilder;
//# sourceMappingURL=update-profile.service.d.ts.map
