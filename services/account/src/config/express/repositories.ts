import { ContactQueryRepository } from '@oumi-package/contact';
import { Oumi } from '@oumi-package/core/lib';
import {
  simpleJWTFactory,
  simpleJWTReader,
  TokenFactory,
  TokenReader,
  UserCommandRepository,
  UserQueryRepository,
} from '@oumi-package/user/lib';

import moment from 'moment';

import { Environment, SERVICE_ID } from '..';
import {
  TypeORMContactQueryRepository,
  TypeORMUserCommandRepository,
  TypeORMUserQueryRepository,
} from '../../repository/typeorm';

export function loadRepositories(container: Oumi.Container) {
  const env = container.get<Environment>(SERVICE_ID.ENV);

  container.set<TokenFactory>(
    SERVICE_ID.TOKEN_FACTORY,
    simpleJWTFactory({
      expiration: moment()
        .add(parseInt(env.TOKEN_EXPIRATION_DAYS, 10), 'days')
        .unix(),
      issuer: env.TOKEN_ISSUER,
      secret: env.TOKEN_SECRET,
    }),
  );

  container.set<TokenReader>(
    SERVICE_ID.TOKEN_READER,
    simpleJWTReader(env.TOKEN_SECRET),
  );

  container.set<UserCommandRepository>(
    SERVICE_ID.COMMAND_REPOSITORY.USER,
    new TypeORMUserCommandRepository(container),
  );

  container.set<UserQueryRepository>(
    SERVICE_ID.QUERY_REPOSITORY.USER,
    new TypeORMUserQueryRepository(container),
  );

  container.set<ContactQueryRepository>(
    SERVICE_ID.QUERY_REPOSITORY.CONTACT,
    new TypeORMContactQueryRepository(container),
  );
}
