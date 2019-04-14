import { Command } from '@oumi-package/core';

export interface ConfirmContactRequestData {
  contactRequestId: string;
  contactId: string;
}

export class ConfirmContactRequestCommand extends Command<
  ConfirmContactRequestData
> {}
