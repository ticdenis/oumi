import { CommandHandler } from '@oumi-package/core';
import { UpdateProfileCommand, UpdateProfileService } from '.';
export declare type UpdateProfileCommandHandler = (
  service: UpdateProfileService,
) => CommandHandler<UpdateProfileCommand>;
export declare const updateProfileHandler: UpdateProfileCommandHandler;
//# sourceMappingURL=update-profile.handler.d.ts.map
