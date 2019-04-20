import { TaskEither } from 'fp-ts/lib/TaskEither';

import { Payment, PaymentDebt, PaymentDebtId } from '.';

export interface PaymentCommandRepository {
  create(payment: Payment): Promise<void>;
}

export interface PaymentQueryRepository {
  ofDebtId(id: PaymentDebtId): TaskEither<null, PaymentDebt>;
}
