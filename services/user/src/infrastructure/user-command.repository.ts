import { User, UserCommandRepository } from '../domain';

export class InMemoryUserCommandRepository implements UserCommandRepository {
  public create(user: User): Promise<void> {
    return Promise.resolve();
  }
}
