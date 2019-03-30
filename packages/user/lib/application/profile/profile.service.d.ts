import { Either } from 'fp-ts/lib/Either';
import { UserDomainError, UserId, UserQueryRepository } from '../../domain';
import { ProfileResponse } from '.';
export declare type ProfileService = (input: {
  id: UserId;
}) => Promise<Either<UserDomainError, ProfileResponse>>;
export declare type ProfileBuilder = (options: {
  queryRepository: UserQueryRepository;
}) => ProfileService;
export declare const profileBuilderService: ProfileBuilder;
//# sourceMappingURL=profile.service.d.ts.map
