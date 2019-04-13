import { Command } from '@oumi-package/core';

export interface ConfirmDebtRequestData {
  id: string;
}

export class ConfirmDebtRequestCommand extends Command<
  ConfirmDebtRequestData
> {}
