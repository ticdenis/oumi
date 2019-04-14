import { Command } from '@oumi-package/core/lib';

export interface DenyDebtRequestData {
  id: string;
}

export class DenyDebtRequestCommand extends Command<DenyDebtRequestData> {}
