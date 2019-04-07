import { AggregateRoot } from '@oumi-package/core/lib';
import { DebtId } from '@oumi-package/shared/lib/domain/debt.props';
import { UserId } from '@oumi-package/user/lib';

import {
  DEBT_SENDED_STATUS,
  DebtAmount,
  DebtConcept,
  DebtDebtor,
  DebtEvents,
  DebtInitialDate,
  DebtIntervalDate,
  DebtLimitDate,
  DebtLoaner,
} from '.';
import { debtNewRequested } from './debt.events';
import { DEBT_PENDING_STATUS } from './debt.props';

export interface DebtConstructor {
  amount: DebtAmount;
  concept: DebtConcept;
  debtor: DebtDebtor;
  id: DebtId;
  initialDate: DebtInitialDate;
  limitDate: DebtLimitDate;
  loaner: DebtLoaner;
}

export class Debt extends AggregateRoot<DebtEvents> {
  public static newRequest(args: {
    amount: DebtAmount;
    concept: DebtConcept;
    debtorId: UserId;
    id: DebtId;
    intervalDate: DebtIntervalDate;
    loanerId: UserId;
  }): Debt {
    const debt = new Debt({
      amount: args.amount,
      concept: args.concept,
      debtor: {
        id: args.debtorId,
        status: DEBT_PENDING_STATUS,
      },
      id: args.id,
      initialDate: args.intervalDate.value.initial,
      limitDate: args.intervalDate.value.limit,
      loaner: {
        id: args.loanerId,
        status: DEBT_SENDED_STATUS,
      },
    });

    debt.recordDomainEvent(
      debtNewRequested({
        amount: debt._amount.value.amount,
        concept: debt._concept.value,
        debtorId: debt._debtor.id.value,
        id: debt._id.value,
        loanerId: debt._loaner.id.value,
      }),
    );

    return debt;
  }

  private _amount: DebtAmount;
  private _concept: DebtConcept;
  private _debtor: DebtDebtor;
  private _id: DebtId;
  private _initialDate: DebtInitialDate;
  private _limitDate: DebtLimitDate;
  private _loaner: DebtLoaner;

  public constructor(args: DebtConstructor) {
    super();

    this._amount = args.amount;
    this._concept = args.concept;
    this._debtor = args.debtor;
    this._id = args.id;
    this._initialDate = args.initialDate;
    this._limitDate = args.limitDate;
    this._loaner = args.loaner;
  }

  get amount(): DebtAmount {
    return this._amount;
  }

  get concept(): DebtConcept {
    return this._concept;
  }

  get debtor(): DebtDebtor {
    return this._debtor;
  }

  get id(): DebtId {
    return this._id;
  }

  get initialDate(): DebtInitialDate {
    return this._initialDate;
  }

  get limitDate(): DebtLimitDate {
    return this._limitDate;
  }

  get loaner(): DebtLoaner {
    return this._loaner;
  }
}
