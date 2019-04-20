import { Command } from '@oumi-package/shared/lib/core';

export interface NewPaymentRequestData {
  debt: string;
  id: string;
  message: string | null;
  quantity: number;
}

export class NewPaymentRequestCommand extends Command<NewPaymentRequestData> {}

/*
SERVICE - TRANSACTIONS

debts
---

id = 1
quantity = 100
user_id = 98
contact_id = 23

payments
---
id = 56789
quantity = X
debt_id = 1

___________________

PACKAGE - PAYMENT
---

payment
---

id = 4563
debt
message = 'hola'
quantity = 10

debt
---
id = 1
quantity = 5
debtorId = 98
loanerId = 23
*/
