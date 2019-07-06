import {
  ContactQueryRepository,
  contactRequestsBuilderService,
  contactRequestsHandler,
  ContactRequestsQuery,
} from '@oumi-package/contact/lib';
import { Oumi } from '@oumi-package/shared/lib/core';

import { SERVICE_ID } from '../../config';

export const CONTACT_REQUESTS_QUERY = ContactRequestsQuery.name;

export const CONTACT_REQUESTS_QUERY_HANDLER = (container: Oumi.Container) =>
  contactRequestsHandler(
    contactRequestsBuilderService({
      queryRepository: container.get<ContactQueryRepository>(
        SERVICE_ID.QUERY_REPOSITORY.CONTACT,
      ),
    }),
  );
