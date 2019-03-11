import { User, UserEmail, UserQueryRepository } from '../domain';

export class InMemoryUserQueryRepository implements UserQueryRepository {
  public ofEmail(email: UserEmail): Promise<User> {
    return Promise.resolve(null);
  }
}
