import {
  ContactQueryRepository,
  userContactsBuilderService,
  userContactsHandler,
  UserContactsQuery,
} from '@oumi-package/contact/lib';
import { Oumi } from '@oumi-package/shared/lib/core';

import { SERVICE_ID } from '../../config';

export const USER_CONTACTS_QUERY = UserContactsQuery.name;

export const USER_CONTACTS_QUERY_HANDLER = (container: Oumi.Container) =>
  userContactsHandler(
    userContactsBuilderService({
      queryRepository: container.get<ContactQueryRepository>(
        SERVICE_ID.QUERY_REPOSITORY.CONTACT,
      ),
    }),
  );
