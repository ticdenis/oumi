import { EventPublisher } from '@oumi-package/core/lib';
import { DebtIdStub } from '@oumi-package/shared/lib/infrastructure/test/debt.stubs';

import { Arg, Substitute } from '@fluffy-spoon/substitute';
import ava, { TestInterface } from 'ava';

import {
  newDebtRequestBuilderService,
  NewDebtRequestCommand,
  NewDebtRequestData,
  newDebtRequestHandler,
} from '../../src/application';
import { DebtCommandRepository, DebtQueryRepository } from '../../src/domain';
import {
  DebtAmountStub,
  DebtConceptStub,
  DebtDebtorStub,
  DebtInitialDateStub,
  DebtLimitDateStub,
  DebtLoanerStub,
} from '../../src/infrastructure/test/debt.stubs';

const helper = {
  command: (data: NewDebtRequestData) => new NewDebtRequestCommand(data),
  handler: (
    opts: Partial<{
      commandRepository: DebtCommandRepository;
      eventPublisher: EventPublisher;
      queryRepository: DebtQueryRepository;
    }> = {},
  ) =>
    newDebtRequestHandler(
      newDebtRequestBuilderService({
        commandRepository:
          opts.commandRepository || Substitute.for<DebtCommandRepository>(),
        eventPublisher: opts.eventPublisher || Substitute.for<EventPublisher>(),
        queryRepository:
          opts.queryRepository || Substitute.for<DebtQueryRepository>(),
      }),
    ),
};

const test = ava as TestInterface<{
  data: NewDebtRequestData;
}>;

test.beforeEach(t => {
  t.context.data = {
    amount: DebtAmountStub.value.amount,
    concept: DebtConceptStub.value,
    currency: DebtAmountStub.value.currency.code,
    debtorId: DebtDebtorStub.id.value,
    id: DebtIdStub.value,
    initialDate: DebtInitialDateStub.value,
    limitDate: DebtLimitDateStub.value,
    loanerId: DebtLoanerStub.id.value,
  };
});

test('should throw loader not found', async t => {
  // Given
  const queryRepository = Substitute.for<DebtQueryRepository>();
  queryRepository.loanerExists(Arg.any()).returns(Promise.resolve(false));
  const handler = helper.handler({ queryRepository });
  const command = helper.command(t.context.data);
  // When
  const fn = handler(command);
  // Then
  await t.throwsAsync(fn);
});

test('should throw debtor not found', async t => {
  // Given
  const queryRepository = Substitute.for<DebtQueryRepository>();
  queryRepository.loanerExists(Arg.any()).returns(Promise.resolve(true));
  queryRepository.debtorExists(Arg.any()).returns(Promise.resolve(false));
  const handler = helper.handler({ queryRepository });
  const command = helper.command(t.context.data);
  // When
  const fn = handler(command);
  // Then
  await t.throwsAsync(fn);
});

test('should send new debt request', async t => {
  // Given
  const commandRepository = Substitute.for<DebtCommandRepository>();
  commandRepository.create(Arg.any()).returns(Promise.resolve());
  const eventPublisher = Substitute.for<EventPublisher>();
  eventPublisher.publish().returns(Promise.resolve());
  const queryRepository = Substitute.for<DebtQueryRepository>();
  queryRepository.loanerExists(Arg.any()).returns(Promise.resolve(true));
  queryRepository.debtorExists(Arg.any()).returns(Promise.resolve(true));
  const handler = helper.handler({
    commandRepository,
    eventPublisher,
    queryRepository,
  });
  const command = helper.command(t.context.data);
  // When
  const fn = handler(command);
  // Then
  await t.notThrowsAsync(fn);
});
