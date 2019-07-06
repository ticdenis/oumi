import { Command } from '@oumi-package/shared/lib/core';

export interface ConfirmDebtRequestData {
  id: string;
}

export class ConfirmDebtRequestCommand extends Command<
  ConfirmDebtRequestData
> {}
