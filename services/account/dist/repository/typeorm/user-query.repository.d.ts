import { Oumi } from '@oumi-package/core/lib';
import { User, UserEmail, UserId, UserQueryRepository } from '@oumi-package/user/lib';
import { TaskEither } from 'fp-ts/lib/TaskEither';
export declare class TypeORMUserQueryRepository implements UserQueryRepository {
    private readonly _repository;
    constructor(container: Oumi.Container);
    ofEmail(email: UserEmail): TaskEither<null, User>;
    ofId(id: UserId): TaskEither<null, User>;
    private _map;
}
//# sourceMappingURL=user-query.repository.d.ts.map