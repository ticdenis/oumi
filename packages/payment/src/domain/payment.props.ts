import {
  DateVO,
  dateVO,
  FloatVO,
  floatVO,
  NullableStringVO,
  nullableStringVO,
  UuidVO,
  uuidVO,
} from '@oumi-package/shared/lib/core';
import { DebtId } from '@oumi-package/shared/lib/domain/debt.props';
import { UserId } from '@oumi-package/shared/lib/domain/user.props';

// Types

export type PaymentDebtId = DebtId;

export type PaymentDebtUserId = UserId;

export type PaymentDebtQuantity = FloatVO;

export interface PaymentDebt {
  id: PaymentDebtId;
  debtorId: PaymentDebtUserId;
  loanerId: PaymentDebtUserId;
  quantity: PaymentDebtQuantity;
}

export type PaymentQuantity = FloatVO;

export type PaymentId = UuidVO;

export type PaymentMessage = NullableStringVO;

export type PaymentOcurredOn = DateVO;

// Impl

export const paymentDebtQuantity = floatVO;

export const paymentQuantity = floatVO;

export const paymentIdVO = uuidVO;

export const paymentMessageVO = nullableStringVO;

export const paymentOcurredOn = dateVO;
