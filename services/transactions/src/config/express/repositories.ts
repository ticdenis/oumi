import { EventPublisher, Oumi } from '@oumi-package/shared/lib/core';
import {
  simpleJWTFactory,
  simpleJWTReader,
  TokenFactory,
  TokenReader,
} from '@oumi-package/user/lib';

import moment from 'moment';

import { Environment, SERVICE_ID } from '..';
import { TypeORMDomainEventRepository } from '../../repository/typeorm';

export function loadRepositories(container: Oumi.Container) {
  const env = container.get<Environment>(SERVICE_ID.ENV);

  container.set<EventPublisher>(
    SERVICE_ID.DOMAIN_EVENT_REPOSITORY,
    new TypeORMDomainEventRepository(container),
  );

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
}
