import { Arg, Substitute } from '@fluffy-spoon/substitute';
import { ObjectSubstitute } from '@fluffy-spoon/substitute/dist/src/Transformations';
import ava, { TestInterface } from 'ava';

import {
  debtRequestsBuilderService,
  DebtRequestsData,
  debtRequestsHandler,
  DebtRequestsQuery,
} from '../../src/application';
import { DebtQueryRepository } from '../../src/domain';
import {
  DebtDebtorStub,
  DebtStub,
} from '../../src/infrastructure/test/debt.stubs';

const test = ava as TestInterface<{
  data: DebtRequestsData;
  repository: {
    query: ObjectSubstitute<DebtQueryRepository>;
  };
}>;

test.beforeEach(t => {
  t.context.data = {
    debtorId: DebtDebtorStub.id.value,
  };
  t.context.repository = {
    query: Substitute.for<DebtQueryRepository>(),
  };
});

test('should throw debtor not found', async t => {
  // Given
  t.context.repository.query
    .debtorExists(Arg.any())
    .returns(Promise.resolve(false));
  const service = debtRequestsBuilderService({
    queryRepository: t.context.repository.query,
  });
  const queryHandler = debtRequestsHandler(service);
  const query = new DebtRequestsQuery(t.context.data);
  // When
  const fn = queryHandler(query);
  // Then
  await t.throwsAsync(fn);
});

test('should get debtor requests', async t => {
  // Given
  t.context.repository.query
    .debtorExists(Arg.any())
    .returns(Promise.resolve(true));
  t.context.repository.query
    .pendingRequestsOfDebtorId(Arg.any())
    .returns(Promise.resolve([DebtStub]));
  const service = debtRequestsBuilderService({
    queryRepository: t.context.repository.query,
  });
  const queryHandler = debtRequestsHandler(service);
  const query = new DebtRequestsQuery(t.context.data);
  // When
  const fn = queryHandler(query);
  // Then
  await t.notThrowsAsync(fn);
});
