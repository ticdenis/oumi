import { UserNickname } from '@oumi-package/shared/lib/domain/user.props';

import { TaskEither } from 'fp-ts/lib/TaskEither';

import { Contact, ContactId } from '.';

export interface ContactCommandRepository {
  confirmRequest(contact: Contact, requester: Contact): Promise<void>;
  newRequest(requester: Contact, contact: Contact): Promise<void>;
}

export interface ContactQueryRepository {
  allOfId(id: ContactId): TaskEither<null, Contact[]>;
  ofId(id: ContactId): TaskEither<null, Contact>;
  ofNickname(nickname: UserNickname): TaskEither<null, Contact>;
}
