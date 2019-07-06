import { TaskEither } from 'fp-ts/lib/TaskEither';

import { Payment, PaymentDebt, PaymentDebtId, PaymentDebtUserId } from './';

export interface PaymentCommandRepository {
  create(payment: Payment): Promise<void>;
}

export interface PaymentQueryRepository {
  allOfId(id: PaymentDebtUserId): TaskEither<null, Payment[]>;
  allChargesOfId(id: PaymentDebtUserId): TaskEither<null, Payment[]>;
  ofDebtId(id: PaymentDebtId): TaskEither<null, PaymentDebt>;
}
