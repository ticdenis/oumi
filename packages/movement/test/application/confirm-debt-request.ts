import { EventPublisher } from '@oumi-package/shared/lib/core';
import { DebtIdStub } from '@oumi-package/shared/lib/infrastructure/test/debt.stubs';

import { Arg, Substitute } from '@fluffy-spoon/substitute';
import ava, { TestInterface } from 'ava';
import { right } from 'fp-ts/lib/Either';
import { fromEither, fromLeft } from 'fp-ts/lib/TaskEither';

import {
  confirmDebtRequestBuilderService,
  ConfirmDebtRequestCommand,
  ConfirmDebtRequestData,
  confirmDebtRequestHandler,
} from '../../src/application';
import {
  DEBT_CONFIRMED_STATUS,
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

const helper = {
  command: (data: ConfirmDebtRequestData) =>
    new ConfirmDebtRequestCommand(data),
  handler: (
    opts: Partial<{
      commandRepository: DebtCommandRepository;
      eventPublisher: EventPublisher;
      queryRepository: DebtQueryRepository;
    }> = {},
  ) =>
    confirmDebtRequestHandler(
      confirmDebtRequestBuilderService({
        commandRepository:
          opts.commandRepository || Substitute.for<DebtCommandRepository>(),
        eventPublisher: opts.eventPublisher || Substitute.for<EventPublisher>(),
        queryRepository:
          opts.queryRepository || Substitute.for<DebtQueryRepository>(),
      }),
    ),
};

const test = ava as TestInterface<{
  data: ConfirmDebtRequestData;
}>;

test.beforeEach(t => {
  t.context.data = {
    id: DebtIdStub.value,
  };
});

test('should throw debt not exists', async t => {
  // Given
  const queryRepository = Substitute.for<DebtQueryRepository>();
  queryRepository.ofId(Arg.any()).returns(fromLeft(null));
  const handler = helper.handler({ queryRepository });
  const command = helper.command(t.context.data);
  // When
  const fn = handler(command);
  // Then
  await t.throwsAsync(fn);
});

test('should throw debt request already confirmed', async t => {
  // Given
  const debt = generateDebtStub({
    debtor: generateDebtorStub({
      status: DEBT_CONFIRMED_STATUS,
    }),
    loaner: generateLoanerStub({
      status: DEBT_CONFIRMED_STATUS,
    }),
  });
  const queryRepository = Substitute.for<DebtQueryRepository>();
  queryRepository.ofId(Arg.any()).returns(fromEither(right(debt)));
  const handler = helper.handler({ queryRepository });
  const command = helper.command(t.context.data);
  // When
  const fn = handler(command);
  // Then
  await t.throwsAsync(fn);
});

test('should confirm debt request', async t => {
  // Given
  const debt = generateDebtStub({
    debtor: generateDebtorStub({
      status: DEBT_PENDING_STATUS,
    }),
    id: DebtIdStub,
    loaner: generateLoanerStub({
      status: DEBT_SENDED_STATUS,
    }),
  });
  const commandRepository = Substitute.for<DebtCommandRepository>();
  commandRepository.confirmDebtRequest(Arg.any()).returns(Promise.resolve());
  const eventPublisher = Substitute.for<EventPublisher>();
  eventPublisher.publish().returns(Promise.resolve());
  const queryRepository = Substitute.for<DebtQueryRepository>();
  queryRepository.ofId(Arg.any()).returns(fromEither(right(debt)));
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
