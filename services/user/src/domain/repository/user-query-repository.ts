import { User } from '../user';
import { UserEmail } from '../value-object';

export interface UserQueryRepository {
  ofEmail(email: UserEmail): Promise<User | null>;
}
