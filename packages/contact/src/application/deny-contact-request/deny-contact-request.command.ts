import { Command } from '@oumi-package/shared/lib/core';

export interface DenyContactRequestData {
  contactRequestId: string;
  contactId: string;
}

export class DenyContactRequestCommand extends Command<
  DenyContactRequestData
> {}
