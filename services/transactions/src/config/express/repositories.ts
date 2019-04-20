import {
  DebtCommandRepository,
  DebtQueryRepository,
} from '@oumi-package/debt/lib/domain';
import { EventPublisher, Oumi } from '@oumi-package/shared/lib/core';
import {
  simpleJWTFactory,
  simpleJWTReader,
  TokenFactory,
  TokenReader,
} from '@oumi-package/user/lib';

import moment from 'moment';

import { Environment, SERVICE_ID } from '..';
import {
  TypeORMDebtCommandRepository,
  TypeORMDebtQueryRepository,
  TypeORMDomainEventRepository,
} from '../../repositories/typeorm';

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

  container.set<DebtQueryRepository>(
    SERVICE_ID.QUERY_REPOSITORY.DEBT,
    new TypeORMDebtQueryRepository(container),
  );

  container.set<DebtCommandRepository>(
    SERVICE_ID.COMMAND_REPOSITORY.DEBT,
    new TypeORMDebtCommandRepository(container),
  );
}
