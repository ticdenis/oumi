import { EventPublisher } from '@oumi-package/core/lib';
import { DebtIdStub } from '@oumi-package/shared/lib/infrastructure/test/debt.stubs';

import { Arg, Substitute } from '@fluffy-spoon/substitute';
import { ObjectSubstitute } from '@fluffy-spoon/substitute/dist/src/Transformations';
import ava, { TestInterface } from 'ava';
import { right } from 'fp-ts/lib/Either';
import { fromEither, fromLeft } from 'fp-ts/lib/TaskEither';

import {
  denyDebtRequestBuilderService,
  DenyDebtRequestCommand,
  DenyDebtRequestData,
  denyDebtRequestHandler,
} from '../../src/application';
import {
  Debt,
  DEBT_DENY_STATUS,
  DEBT_PENDING_STATUS,
  DEBT_SENDED_STATUS,
  DebtCommandRepository,
  DebtQueryRepository,
} from '../../src/domain';
import {
  generateDebtorStub,
  generateDebtStub,
  generateLoanerStub,
} from '../../src/infrastructure/test/debt.stubs';

const test = ava as TestInterface<{
  data: DenyDebtRequestData;
  eventPublisher: ObjectSubstitute<EventPublisher>;
  repository: {
    command: ObjectSubstitute<DebtCommandRepository>;
    query: ObjectSubstitute<DebtQueryRepository>;
  };
  debt: Debt;
}>;

test.beforeEach(t => {
  t.context.data = {
    id: DebtIdStub.value,
  };
  t.context.eventPublisher = Substitute.for<EventPublisher>();
  t.context.repository = {
    command: Substitute.for<DebtCommandRepository>(),
    query: Substitute.for<DebtQueryRepository>(),
  };
  t.context.debt = generateDebtStub({
    debtor: generateDebtorStub({
      status: DEBT_PENDING_STATUS,
    }),
    id: DebtIdStub,
    loaner: generateLoanerStub({
      status: DEBT_SENDED_STATUS,
    }),
  });
});

test('should throw debt not exists', async t => {
  // Given
  t.context.repository.query.ofId(Arg.any()).returns(fromLeft(null));
  const service = denyDebtRequestBuilderService({
    commandRepository: t.context.repository.command,
    eventPublisher: t.context.eventPublisher,
    queryRepository: t.context.repository.query,
  });
  const commandHandler = denyDebtRequestHandler(service);
  const command = new DenyDebtRequestCommand(t.context.data);
  // When
  const fn = commandHandler(command);
  // Then
  await t.throwsAsync(fn);
});

test('should throw debt request already denied', async t => {
  // Given
  const debt = generateDebtStub({
    debtor: generateDebtorStub({
      status: DEBT_DENY_STATUS,
    }),
    loaner: generateLoanerStub({
      status: DEBT_DENY_STATUS,
    }),
  });
  t.context.repository.query.ofId(Arg.any()).returns(fromEither(right(debt)));
  const service = denyDebtRequestBuilderService({
    commandRepository: t.context.repository.command,
    eventPublisher: t.context.eventPublisher,
    queryRepository: t.context.repository.query,
  });
  const commandHandler = denyDebtRequestHandler(service);
  const command = new DenyDebtRequestCommand(t.context.data);
  // When
  const fn = commandHandler(command);
  // Then
  await t.throwsAsync(fn);
});

test('should deny debt request', async t => {
  // Given
  t.context.repository.query
    .ofId(Arg.any())
    .returns(fromEither(right(t.context.debt)));
  t.context.repository.command
    .confirmDebtRequest(Arg.any())
    .returns(Promise.resolve());
  t.context.eventPublisher.publish().returns(Promise.resolve());
  const service = denyDebtRequestBuilderService({
    commandRepository: t.context.repository.command,
    eventPublisher: t.context.eventPublisher,
    queryRepository: t.context.repository.query,
  });
  const commandHandler = denyDebtRequestHandler(service);
  const command = new DenyDebtRequestCommand(t.context.data);
  // When
  const fn = commandHandler(command);
  // Then
  await t.notThrowsAsync(fn);
});
