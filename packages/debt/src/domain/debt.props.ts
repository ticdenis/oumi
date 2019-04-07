import {
  intervalDateVO,
  NullableDateVO,
  nullableDateVO,
  simpleValueObject,
  StringVO,
  stringVO,
  ValueObject,
} from '@oumi-package/core/lib';
import { CurrencyVO } from '@oumi-package/shared/lib//domain/currency.props';
import {
  AmountVO,
  amountVO,
} from '@oumi-package/shared/lib/domain/amount.props';
import { UserId } from '@oumi-package/user/lib';

import moment from 'moment';

// Types

export type DebtAmount = AmountVO;

export type DebtConcept = StringVO;

export type DebtInitialDate = NullableDateVO;

export type DebtIntervalDate = ValueObject<{
  initial: DebtInitialDate;
  limit: DebtLimitDate;
}>;

export type DebtLimitDate = NullableDateVO;

export type DebtStatus = 'SENDED' | 'PENDING' | 'ACCEPTED' | 'REFUSED';

export interface DebtDebtor {
  id: UserId;
  status: DebtStatus;
}

export interface DebtLoaner {
  id: UserId;
  status: DebtStatus;
}

// Impl

export const DEBT_SENDED_STATUS: DebtStatus = 'SENDED';

export const DEBT_PENDING_STATUS: DebtStatus = 'PENDING';

export const DEBT_ACCEPTED_STATUS: DebtStatus = 'ACCEPTED';

export const DEBT_REFUSED_STATUS: DebtStatus = 'REFUSED';

const TWO_DECIMALS_REGEX = /^\d+([.]?(\d{1,2})){0,1}/g;

export const debtAmountVO = (value: {
  amount: number;
  currency: CurrencyVO;
}): DebtAmount => {
  let amount = amountVO(value);

  const newAmount = Number(
    amountVO(value)
      .value.amount.toString()
      .match(TWO_DECIMALS_REGEX)[0],
  );

  amount = amountVO({
    amount: newAmount,
    currency: value.currency,
  });

  return simpleValueObject(amount.value);
};

export const debtConceptVO = stringVO;

export const debtInitialDateVO = (
  value: Date | null = null,
): DebtInitialDate => {
  let date = nullableDateVO(value);

  if (null === date.value) {
    date = nullableDateVO(new Date());
  }

  return simpleValueObject(date.value);
};

export const debtLimitDateVO = (value: Date | null = null): DebtLimitDate => {
  let date = nullableDateVO(value);

  if (null === date.value) {
    date = nullableDateVO(
      moment()
        .add(3, 'months')
        .toDate(),
    );
  }

  return simpleValueObject(date.value);
};

export const debtIntervalDateVO = (value: {
  end: Date;
  start: Date;
}): DebtIntervalDate => {
  const dates = intervalDateVO(value);

  return simpleValueObject<{
    initial: DebtInitialDate;
    limit: DebtLimitDate;
  }>({
    initial: debtInitialDateVO(dates.value.start),
    limit: debtLimitDateVO(dates.value.end),
  });
};
