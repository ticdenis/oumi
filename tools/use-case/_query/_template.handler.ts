import { eitherToPromise, QueryHandler } from "@oumi-package/shared/lib/core";

import { _TemplateQuery, _TemplateResponse, _TemplateService } from ".";

export type _TemplateQueryHandler = (
  service: _TemplateService
) => QueryHandler<_TemplateQuery, _TemplateResponse>;

export const _templateHandler: _TemplateQueryHandler = service => async query =>
  eitherToPromise(
    await service({
      // TODO: [key: string]: ValueObject<any> using query
    })
  );
