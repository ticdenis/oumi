import {
  CommandBus,
  DomainCommandBus,
  DomainEventPublisher,
  DomainQueryBus,
  EventPublisher,
  QueryBus,
} from '@oumi-package/shared/lib';
import {
  InMemoryUserCommandRepository,
  InMemoryUserQueryRepository,
  UserCommandRepository,
  UserQueryRepository,
  userRegistration,
  userRegistrationCommandHandler,
  UserRegistrationCommandName,
} from '@oumi-package/user/lib';

import express from 'express';
import helmet from 'helmet';
import { Container } from 'inversify';
import morgan from 'morgan';

import {
  healthzGetController,
  userRegistrationPostController,
} from '../controller';
import { ApplicationLoader } from '../dsl';

function loadRepositories(container: Container) {
  container
    .bind<UserCommandRepository>('user.command.repository')
    .to(InMemoryUserCommandRepository);

  container
    .bind<UserQueryRepository>('user.query.repository')
    .to(InMemoryUserQueryRepository);
}

function loadEventPublisher(container: Container) {
  container
    .bind<EventPublisher>('event-publisher')
    .toConstantValue(DomainEventPublisher.instance());
}

function loadQueryBus(container: Container) {
  container
    .bind<QueryBus>('query-bus')
    .toConstantValue(DomainQueryBus.instance());
}

function loadCommandBus(container: Container) {
  container.bind<CommandBus>('command-bus').toDynamicValue(() => {
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
  // TODO: Check!
  // app.use((err: Error, _: express.Request, res: express.Response) => {
  //   res.status(500).send(err.message);
  // });
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
    listen: app.listen,
  });
};
