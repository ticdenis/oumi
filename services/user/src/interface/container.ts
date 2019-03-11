import { Container as InversifyContainer } from 'inversify';

import { UserCommandRepository, UserQueryRepository } from '../domain';
import { InMemoryUserCommandRepository } from '../infrastructure//user-command.repository';
import { InMemoryUserQueryRepository } from '../infrastructure//user-query.repository';

import { ContainerLoader } from './dsl';

export const containerLoader: ContainerLoader = () => {
  const container = new InversifyContainer();

  container
    .bind<UserCommandRepository>('user.command.repository')
    .to(InMemoryUserCommandRepository);

  container
    .bind<UserQueryRepository>('user.query.repository')
    .to(InMemoryUserQueryRepository);

  return Promise.resolve(container as any);
};
