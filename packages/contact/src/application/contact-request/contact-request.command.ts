import { Command } from '@oumi-package/core';

export interface ContactRequestData {
  requesterId: string;
  nickname: string;
  message?: string;
}

export class ContactRequestCommand extends Command<ContactRequestData> {}
