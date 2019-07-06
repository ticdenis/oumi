import { Command } from '@oumi-package/shared/lib/core';

export interface ContactRequestData {
  requesterId: string;
  nickname: string;
  message?: string;
}

export class ContactRequestCommand extends Command<ContactRequestData> {}
