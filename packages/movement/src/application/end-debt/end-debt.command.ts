import { Command } from '@oumi-package/shared/lib/core';

export interface EndDebtData {
  id: string;
}

export class EndDebtCommand extends Command<EndDebtData> {}
