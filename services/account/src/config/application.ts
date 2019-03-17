import {
  CommandBus,
  DomainCommandBus,
  DomainEventPublisher,
  DomainQueryBus,
  EventPublisher,
  QueryBus,
} from '@oumi-package/shared/lib';
import {
  UserCommandRepository,
  UserQueryRepository,
  userRegistration,
  userRegistrationCommandHandler,
  UserRegistrationCommandName,
} from '@oumi-package/user/lib';

import express from 'express';
import helmet from 'helmet';
import * as HttpStatus from 'http-status-codes';
import morgan from 'morgan';

import {
  healthzGetController,
  koResponse,
  userRegistrationPostController,
} from '../controller';
import { ApplicationLoader, Container } from '../dsl';
import {
  TypeORMUserCommandRepository,
  TypeORMUserQueryRepository,
} from '../repository';

function loadRepositories(container: Container) {
  container.set<UserCommandRepository>(
    'user.command.repository',
    new TypeORMUserCommandRepository(container),
  );

  container.set<UserQueryRepository>(
    'user.query.repository',
    new TypeORMUserQueryRepository(container),
  );
}

function loadEventPublisher(container: Container) {
  container.set<EventPublisher>(
    'event-publisher',
    DomainEventPublisher.instance(),
  );
}

function loadQueryBus(container: Container) {
  container.set<QueryBus>('query-bus', DomainQueryBus.instance());
}

function loadCommandBus(container: Container) {
  container.setAsync<CommandBus>('command-bus', () => {
    const commandBus = DomainCommandBus.instance();

    commandBus.addHandler(
      UserRegistrationCommandName,
      userRegistrationCommandHandler(
        userRegistration({
          commandRepository: container.get<UserCommandRepository>(
            'user.command.repository',
          ),
          eventPublisher: container.get<EventPublisher>('event-publisher'),
          queryRepository: container.get<UserQueryRepository>(
            'user.query.repository',
          ),
        }),
      ),
    );

    return commandBus;
  });
}

function loadBeforeMiddlewares(app: express.Application, container: Container) {
  app.use(helmet());

  app.use(morgan('combined'));

  app.use(express.json());
}

function loadRoutes(app: express.Application, container: Container) {
  app.get('/healthz', healthzGetController(container));

  app.post('/users', userRegistrationPostController(container));
}

function loadAfterMiddlewares(app: express.Application, container: Container) {
  app.use((err: Error, req: any, res: express.Response, next: any) => {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
      koResponse([
        {
          code: err.name,
          message: err.message,
        },
      ]),
    );
  });
}

export const appLoader: ApplicationLoader = container => {
  loadRepositories(container);

  loadEventPublisher(container);

  loadQueryBus(container);

  loadCommandBus(container);

  const app = express();

  loadBeforeMiddlewares(app, container);

  loadRoutes(app, container);

  loadAfterMiddlewares(app, container);

  return Promise.resolve({
    listen: app.listen.bind(app),
  });
};
