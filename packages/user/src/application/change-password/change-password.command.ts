import { Command } from '@oumi-package/core/lib';

export interface ChangePasswordData {
  id: string;
  newPassword: string;
  oldPassword: string;
}

export class ChangePasswordCommand extends Command<ChangePasswordData> {}
