import { Oumi } from '@oumi-package/core/lib';
import { User, UserCommandRepository } from '@oumi-package/user/lib';
export declare class TypeORMUserCommandRepository
  implements UserCommandRepository {
  private readonly _connection;
  constructor(container: Oumi.Container);
  create(user: User): Promise<void>;
}
//# sourceMappingURL=user-command.repository.d.ts.map
