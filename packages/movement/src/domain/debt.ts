import { AggregateRoot } from '@oumi-package/shared/lib/core';
import { DebtId } from '@oumi-package/shared/lib/domain/debt.props';

import {
  debRequestDenied,
  DEBT_COMPLETED_STATUS,
  DEBT_CONFIRMED_STATUS,
  DEBT_DENY_STATUS,
  DEBT_PENDING_STATUS,
  DEBT_SENDED_STATUS,
  DebtAmount,
  debtCompleted,
  DebtConcept,
  DebtDebtor,
  DebtDomainError,
  DebtEvents,
  DebtInitialDate,
  DebtIntervalDate,
  DebtLimitDate,
  DebtLoaner,
  debtNewRequested,
  DebtorId,
  debtRequestConfirmed,
  LoanerId,
} from '.';

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
    debtorId: DebtorId;
    id: DebtId;
    intervalDate: DebtIntervalDate;
    loanerId: LoanerId;
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

  public confirmRequest(): void {
    if (
      [this._debtor.status, this._debtor.status].includes(DEBT_CONFIRMED_STATUS)
    ) {
      throw DebtDomainError.debtRequestAlreadyConfirmed(this._id.value);
    }

    this._debtor.status = DEBT_CONFIRMED_STATUS;
    this._loaner.status = DEBT_CONFIRMED_STATUS;

    this.recordDomainEvent(
      debtRequestConfirmed({
        debtorId: this._debtor.id.value,
        id: this._id.value,
        loanerId: this._loaner.id.value,
      }),
    );
  }

  public denyRequest(): void {
    if ([this._debtor.status, this._debtor.status].includes(DEBT_DENY_STATUS)) {
      throw DebtDomainError.debtRequestAlreadyDenied(this._id.value);
    }

    this._debtor.status = DEBT_DENY_STATUS;
    this._loaner.status = DEBT_DENY_STATUS;

    this.recordDomainEvent(
      debRequestDenied({
        debtorId: this._debtor.id.value,
        id: this._id.value,
        loanerId: this._loaner.id.value,
      }),
    );
  }

  public endDebt(): void {
    if (
      [this._debtor.status, this._debtor.status].includes(DEBT_COMPLETED_STATUS)
    ) {
      throw DebtDomainError.debtRequestAlreadyCompleted(this._id.value);
    }

    this._debtor.status = DEBT_COMPLETED_STATUS;
    this._loaner.status = DEBT_COMPLETED_STATUS;

    this.recordDomainEvent(
      debtCompleted({
        debtorId: this._debtor.id.value,
        id: this._id.value,
        loanerId: this._loaner.id.value,
      }),
    );
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
