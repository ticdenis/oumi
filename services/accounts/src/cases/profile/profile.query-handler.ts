import { Oumi } from '@oumi-package/shared/lib/core';
import {
  profileBuilderService,
  profileHandler,
  ProfileQuery,
  UserQueryRepository,
} from '@oumi-package/user/lib';

import { SERVICE_ID } from '../../config';

export const PROFILE_QUERY = ProfileQuery.name;

export const PROFILE_QUERY_HANDLER = (container: Oumi.Container) =>
  profileHandler(
    profileBuilderService({
      queryRepository: container.get<UserQueryRepository>(
        SERVICE_ID.QUERY_REPOSITORY.USER,
      ),
    }),
  );
