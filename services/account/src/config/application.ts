import {
  DomainCommandBus,
  DomainEventPublisher,
  DomainQueryBus,
  EventPublisher,
} from '@oumi-package/shared';
import {
  InMemoryUserCommandRepository,
  InMemoryUserQueryRepository,
  UserCommandRepository,
  UserQueryRepository,
  userRegistration,
  userRegistrationCommandHandler,
  UserRegistrationCommandName,
} from '@oumi-package/user';

import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import {
  healthzGetController,
  userRegistrationPostController,
} from '../controller';
import { ApplicationLoader, Container } from '../dsl';

function loadRepositories(container: Container) {
  container.set('user.command.repository', InMemoryUserCommandRepository);

  container.set('user.query.repository', InMemoryUserQueryRepository);
}

function loadEventPublisher(container: Container) {
  // TODO
  container.set('event-publisher', DomainEventPublisher.instance());
}

function loadQueryBus(container: Container) {
  // TODO
  container.set('query-bus', DomainQueryBus.instance());
}

function loadCommandBus(container: Container) {
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

  container.set('command-bus', commandBus);
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
  // TODO: Check!
  // app.use((err: Error, _: express.Request, res: express.Response) => {
  //   res.status(500).send(err.message);
  // });
}

export const appLoader: ApplicationLoader = container => {
  loadEventPublisher(container);

  loadQueryBus(container);

  loadCommandBus(container);

  loadRepositories(container);

  const app = express();

  loadBeforeMiddlewares(app, container);

  loadRoutes(app, container);

  loadAfterMiddlewares(app, container);

  return Promise.resolve({
    listen: app.listen,
  });
};
