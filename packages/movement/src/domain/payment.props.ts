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
import { DebtId, debtIdVO } from '@oumi-package/shared/lib/domain/debt.props';
import { UserId, userIdVO } from '@oumi-package/shared/lib/domain/user.props';

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

// Impl

export const paymentDebtIdVO = debtIdVO;

export const paymentDebtUserIdVO = userIdVO;

export const paymentDebtQuantityVO = floatVO;

export const paymentQuantityVO = floatVO;

export const paymentIdVO = uuidVO;

export const paymentMessageVO = nullableStringVO;

export const paymentOcurredOnVO = dateVO;
