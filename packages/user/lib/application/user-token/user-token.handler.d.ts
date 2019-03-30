import { QueryHandler } from '@oumi-package/core';
import { UserTokenQuery } from './user-token.query';
import { UserTokenResponse, UserTokenService } from './user-token.service';
export declare type UserQueryHandler = (
  service: UserTokenService,
) => QueryHandler<UserTokenQuery, UserTokenResponse>;
export declare const userTokenHandler: UserQueryHandler;
//# sourceMappingURL=user-token.handler.d.ts.map
