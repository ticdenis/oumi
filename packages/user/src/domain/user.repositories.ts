import { TaskEither } from 'fp-ts/lib/TaskEither';

import { User } from './user';
import { UserEmail, UserId } from './user.props';

export interface UserCommandRepository {
  create(user: User): Promise<void>;
}

export interface UserQueryRepository {
  ofEmail(email: UserEmail): TaskEither<null, User>;
  ofId(id: UserId): TaskEither<null, User>;
}
