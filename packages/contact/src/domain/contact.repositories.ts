import { UserId } from '@oumi-package/shared/lib/domain/user.props';

import { TaskEither } from 'fp-ts/lib/TaskEither';

import { Contact } from '.';

// tslint:disable-next-line: no-empty-interface
export interface ContactCommandRepository {}

export interface ContactQueryRepository {
  allOfId(id: UserId): TaskEither<null, Contact[]>;
}
