import { eitherToPromise, QueryHandler } from '@oumi-package/core';

import { userIdVO } from '../../domain';

import { ProfileQuery, ProfileResponse, ProfileService } from '.';

export type ProfileQueryHandler = (
  service: ProfileService,
) => QueryHandler<ProfileQuery, ProfileResponse>;

export const profileHandler: ProfileQueryHandler = service => async query =>
  eitherToPromise(
    await service({
      id: userIdVO(query.data.id),
    }),
  );
