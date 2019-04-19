import { Command } from '@oumi-package/shared/lib/core';

export interface ConfirmContactRequestData {
  contactRequestId: string;
  contactId: string;
}

export class ConfirmContactRequestCommand extends Command<
  ConfirmContactRequestData
> {}
