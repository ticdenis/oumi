import {
  ContactQueryRepository,
  userContactsBuilderService,
  userContactsHandler,
  UserContactsQuery,
} from '@oumi-package/contact';

import { SERVICE_ID } from '..';

import { MakeQueryHandler } from '.';

const handler: MakeQueryHandler = container => {
  return [
    UserContactsQuery.name,
    userContactsHandler(
      userContactsBuilderService({
        queryRepository: container.get<ContactQueryRepository>(
          SERVICE_ID.QUERY_REPOSITORY.CONTACT,
        ),
      }),
    ),
  ];
};

export default handler;
