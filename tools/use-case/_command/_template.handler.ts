import { CommandHandler, eitherToPromise } from "@oumi-package/core/lib";

import { _TemplateCommand, _TemplateService } from ".";

export type _TemplateCommandHandler = (
  service: _TemplateService
) => CommandHandler<_TemplateCommand>;

export const _templateHandler: _TemplateCommandHandler = service => async command =>
  eitherToPromise(
    await service({
      // TODO: [key: string]: ValueObject<any> using command
    })
  );
