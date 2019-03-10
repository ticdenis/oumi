import { User } from '../user';

export interface UserCommandRepository {
  create(user: User): Promise<void>;
}
