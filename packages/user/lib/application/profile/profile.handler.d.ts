import { QueryHandler } from '@oumi-package/core';
import { ProfileQuery, ProfileResponse, ProfileService } from '.';
export declare type ProfileQueryHandler = (
  service: ProfileService,
) => QueryHandler<ProfileQuery, ProfileResponse>;
export declare const profileHandler: ProfileQueryHandler;
//# sourceMappingURL=profile.handler.d.ts.map
