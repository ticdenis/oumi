import { Command } from '@oumi-package/core/lib';

export interface DenyContactRequestData {
  contactRequestId: string;
  contactId: string;
}

export class DenyContactRequestCommand extends Command<
  DenyContactRequestData
> {}
