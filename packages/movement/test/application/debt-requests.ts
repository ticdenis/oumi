import { Arg, Substitute } from '@fluffy-spoon/substitute';
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

const helper = {
  handler: (
    opts: Partial<{
      queryRepository: DebtQueryRepository;
    }> = {},
  ) =>
    debtRequestsHandler(
      debtRequestsBuilderService({
        queryRepository:
          opts.queryRepository || Substitute.for<DebtQueryRepository>(),
      }),
    ),
  query: (data: DebtRequestsData) => new DebtRequestsQuery(data),
};

const test = ava as TestInterface<{
  data: DebtRequestsData;
}>;

test.beforeEach(t => {
  t.context.data = {
    debtorId: DebtDebtorStub.id.value,
  };
});

test('should throw debtor not found', async t => {
  // Given
  const queryRepository = Substitute.for<DebtQueryRepository>();
  queryRepository.debtorExists(Arg.any()).returns(Promise.resolve(false));
  const handler = helper.handler({ queryRepository });
  const query = new DebtRequestsQuery(t.context.data);
  // When
  const fn = handler(query);
  // Then
  await t.throwsAsync(fn);
});

test('should get debtor requests', async t => {
  // Given
  const queryRepository = Substitute.for<DebtQueryRepository>();
  queryRepository.debtorExists(Arg.any()).returns(Promise.resolve(true));
  queryRepository
    .pendingRequestsOfDebtorId(Arg.any())
    .returns(Promise.resolve([DebtStub]));
  const handler = helper.handler({ queryRepository });
  const query = new DebtRequestsQuery(t.context.data);
  // When
  const fn = handler(query);
  // Then
  await t.notThrowsAsync(fn);
});
