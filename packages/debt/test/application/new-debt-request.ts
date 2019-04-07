import { EventPublisher } from '@oumi-package/core/lib';
import { UserIdStub } from '@oumi-package/shared/lib/infrastructure/test/user.stubs';

import { Arg, Substitute } from '@fluffy-spoon/substitute';
import { ObjectSubstitute } from '@fluffy-spoon/substitute/dist/src/Transformations';
import ava, { TestInterface } from 'ava';

import {
  newDebtRequestBuilderService,
  NewDebtRequestCommand,
  NewDebtRequestData,
  newDebtRequestHandler,
} from '../../src/application';
import {
  Debt,
  DebtCommandRepository,
  DebtQueryRepository,
} from '../../src/domain';
import {
  DebtAmountStub,
  DebtConceptStub,
  DebtDebtorStub,
  DebtInitialDateStub,
  DebtLimitDateStub,
  DebtLoanerStub,
  generateDebtStub,
} from '../../src/infrastructure/test/debt.stubs';

const test = ava as TestInterface<{
  data: NewDebtRequestData;
  eventPublisher: ObjectSubstitute<EventPublisher>;
  repository: {
    command: ObjectSubstitute<DebtCommandRepository>;
    query: ObjectSubstitute<DebtQueryRepository>;
  };
  debt: Debt;
}>;

test.beforeEach(t => {
  t.context.data = {
    amount: DebtAmountStub.value.amount,
    concept: DebtConceptStub.value,
    currency: DebtAmountStub.value.currency.code,
    debtorId: DebtDebtorStub.id.value,
    id: UserIdStub.value,
    initialDate: DebtInitialDateStub.value,
    limitDate: DebtLimitDateStub.value,
    loanerId: DebtLoanerStub.id.value,
  };
  t.context.eventPublisher = Substitute.for<EventPublisher>();
  t.context.repository = {
    command: Substitute.for<DebtCommandRepository>(),
    query: Substitute.for<DebtQueryRepository>(),
  };
  t.context.debt = generateDebtStub({
    id: UserIdStub,
  });
});

test('should throw loader not found', async t => {
  // Given
  t.context.repository.query
    .loanerExists(Arg.any())
    .returns(Promise.resolve(false));
  const service = newDebtRequestBuilderService({
    commandRepository: t.context.repository.command,
    eventPublisher: t.context.eventPublisher,
    queryRepository: t.context.repository.query,
  });
  const commandHandler = newDebtRequestHandler(service);
  const command = new NewDebtRequestCommand(t.context.data);
  // When
  const fn = commandHandler(command);
  // Then
  await t.throwsAsync(fn);
});

test('should throw debtor not found', async t => {
  // Given
  t.context.repository.query
    .loanerExists(Arg.any())
    .returns(Promise.resolve(true));
  t.context.repository.query
    .debtorExists(Arg.any())
    .returns(Promise.resolve(false));
  const service = newDebtRequestBuilderService({
    commandRepository: t.context.repository.command,
    eventPublisher: t.context.eventPublisher,
    queryRepository: t.context.repository.query,
  });
  const commandHandler = newDebtRequestHandler(service);
  const command = new NewDebtRequestCommand(t.context.data);
  // When
  const fn = commandHandler(command);
  // Then
  await t.throwsAsync(fn);
});

test('should send new debt request', async t => {
  // Given
  t.context.repository.query
    .loanerExists(Arg.any())
    .returns(Promise.resolve(true));
  t.context.repository.query
    .debtorExists(Arg.any())
    .returns(Promise.resolve(true));
  t.context.repository.command.create(Arg.any()).returns(Promise.resolve());
  t.context.eventPublisher.publish().returns(Promise.resolve());
  const service = newDebtRequestBuilderService({
    commandRepository: t.context.repository.command,
    eventPublisher: t.context.eventPublisher,
    queryRepository: t.context.repository.query,
  });
  const commandHandler = newDebtRequestHandler(service);
  const command = new NewDebtRequestCommand(t.context.data);
  // When
  const fn = commandHandler(command);
  // Then
  await t.notThrowsAsync(fn);
});
