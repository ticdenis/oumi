import { CommandHandler, eitherToPromise } from '@oumi-package/shared/lib/core';

import {
  paymentDebtUserIdVO,
  paymentIdVO,
  paymentMessageVO,
  paymentQuantityVO,
} from '../../domain';

import { NewPayCommand, NewPayService } from '.';

export type NewPayCommandHandler = (
  service: NewPayService,
) => CommandHandler<NewPayCommand>;

export const newPayHandler: NewPayCommandHandler = service => async command =>
  eitherToPromise(
    await service({
      debtId: paymentDebtUserIdVO(command.data.debtId),
      id: paymentIdVO(command.data.id),
      message: paymentMessageVO(command.data.message),
      quantity: paymentQuantityVO(command.data.quantity),
    }),
  );
