import { User } from './user';
import { UserEmail } from './user.props';

export interface UserCommandRepository {
  create(user: User): Promise<void>;
}

export interface UserQueryRepository {
  ofEmail(email: UserEmail): Promise<User | null>;
}
