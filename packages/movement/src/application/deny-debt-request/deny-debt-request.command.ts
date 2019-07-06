import { Command } from '@oumi-package/shared/lib/core';

export interface DenyDebtRequestData {
  id: string;
}

export class DenyDebtRequestCommand extends Command<DenyDebtRequestData> {}
