import { Command } from '@oumi-package/core/lib';

export interface ConfirmDebtRequestData {
  id: string;
}

export class ConfirmDebtRequestCommand extends Command<
  ConfirmDebtRequestData
> {}
