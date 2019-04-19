import { Command } from '@oumi-package/shared/lib/core';

export interface ChangePasswordData {
  id: string;
  newPassword: string;
  oldPassword: string;
}

export class ChangePasswordCommand extends Command<ChangePasswordData> {}
