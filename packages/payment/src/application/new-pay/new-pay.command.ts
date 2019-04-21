import { Command } from '@oumi-package/shared/lib/core';

export interface NewPayData {
  debtId: string;
  id: string;
  message: string | null;
  quantity: number;
}

export class NewPayCommand extends Command<NewPayData> {}
