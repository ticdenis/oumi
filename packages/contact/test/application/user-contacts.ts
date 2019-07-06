import { Arg, Substitute } from '@fluffy-spoon/substitute';
import ava, { TestInterface } from 'ava';
import { right } from 'fp-ts/lib/Either';
import { fromEither, fromLeft } from 'fp-ts/lib/TaskEither';
import * as R from 'ramda';

import {
  userContactsBuilderService,
  UserContactsData,
  userContactsHandler,
  UserContactsQuery,
  userContactsTransformer,
} from '../../src/application';
import { ContactQueryRepository } from '../../src/domain';
import { ContactStub } from '../../src/infrastructure/test/contact.stubs';

const helper = {
  handler: (
    opts: Partial<{
      queryRepository: ContactQueryRepository;
    }> = {},
  ) =>
    userContactsHandler(
      userContactsBuilderService({
        queryRepository:
          opts.queryRepository || Substitute.for<ContactQueryRepository>(),
      }),
    ),
  query: (data: UserContactsData) => new UserContactsQuery(data),
};

const test = ava as TestInterface<{
  data: UserContactsData;
}>;

test.beforeEach(t => {
  t.context.data = {
    id: ContactStub.id.value,
  };
});

test('should return a user contacts', async t => {
  // Given
  const contact = ContactStub;
  const queryRepository = Substitute.for<ContactQueryRepository>();
  queryRepository.allOfId(Arg.any()).returns(fromEither(right([contact])));
  const handler = helper.handler({ queryRepository });
  const query = helper.query(t.context.data);
  // When
  const response = await handler(query);
  // Then
  t.true(R.includes(response, [userContactsTransformer([contact])]));
});

test('should throw not found error', async t => {
  // Given
  const queryRepository = Substitute.for<ContactQueryRepository>();
  queryRepository.allOfId(Arg.any()).returns(fromLeft(null));
  const handler = helper.handler({ queryRepository });
  const query = helper.query(t.context.data);
  // When
  const fn = handler(query);
  // Then
  await t.throwsAsync(fn);
});
