import {
  DateVO,
  dateVO,
  FloatVO,
  floatVO,
  NullableStringVO,
  nullableStringVO,
  simpleValueObject,
  UuidVO,
  uuidVO,
  ValueObject,
} from '@oumi-package/shared/lib/core';
import { DebtId, debtIdVO } from '@oumi-package/shared/lib/domain/debt.props';
import { UserId, userIdVO } from '@oumi-package/shared/lib/domain/user.props';

import * as R from 'ramda';

import { Debt, Payment, PaymentConstructor } from '.';

// Types

export type PaymentDebtId = DebtId;

export type PaymentDebtUserId = UserId;

export type PaymentDebtQuantity = FloatVO;

export interface PaymentDebt {
  debtorId: PaymentDebtUserId;
  id: PaymentDebtId;
  loanerId: PaymentDebtUserId;
  quantity: PaymentDebtQuantity;
}

export type PaymentQuantity = FloatVO;

export type PaymentId = UuidVO;

export type PaymentMessage = NullableStringVO;

export type PaymentOcurredOn = DateVO;

export type Movement = PaymentConstructor &
  Pick<Debt, 'concept'> & { type: string };

export type Movements = ValueObject<Movement[]>;

// Impl

export const paymentDebtIdVO = debtIdVO;

export const paymentDebtUserIdVO = userIdVO;

export const paymentDebtQuantityVO = floatVO;

export const paymentQuantityVO = floatVO;

export const paymentIdVO = uuidVO;

export const paymentMessageVO = nullableStringVO;

export const paymentOcurredOnVO = dateVO;

export const movementsVO = ({
  charges,
  debtConcepts,
  payments,
}: {
  charges: Payment[];
  debtConcepts: Pick<Debt, 'id' | 'concept'>[];
  payments: Payment[];
}): Movements => {
  const assocConceptAndType = (type: string) => (payment: Payment) => ({
    concept: R.find(debt => debt.id.equalsTo(payment.debt.id), debtConcepts)
      .concept,
    debt: payment.debt,
    id: payment.id,
    message: payment.message,
    occurredOn: payment.occurredOn,
    quantity: payment.quantity,
    type,
  });

  const movements = R.sort<Movement>(
    (a, b) => b.occurredOn.value.getTime() - a.occurredOn.value.getTime(),
  )(
    R.concat(
      R.map(assocConceptAndType('charge'), charges),
      R.map(assocConceptAndType('payment'), payments),
    ),
  );

  return simpleValueObject(movements);
};
