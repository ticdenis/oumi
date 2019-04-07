import { Command } from '@oumi-package/core/lib';

export interface UpdateProfileData {
  firstname: string;
  id: string;
  lastname: string;
  nickname: string;
  phone: string;
}

export class UpdateProfileCommand extends Command<UpdateProfileData> {}
