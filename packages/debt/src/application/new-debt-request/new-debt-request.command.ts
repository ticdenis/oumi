import { Command } from '@oumi-package/core/lib';

export interface NewDebtRequestData {
  amount: number;
  concept: string;
  currency: string;
  debtorId: string;
  id: string;
  initialDate: Date | null;
  limitDate: Date | null;
  loanerId: string;
}

export class NewDebtRequestCommand extends Command<NewDebtRequestData> {}
