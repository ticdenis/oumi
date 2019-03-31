import { DomainError } from "@oumi-package/core";

import { Either } from "fp-ts/lib/Either";

import { _TemplateResponse } from ".";

export type _TemplateService = (input: {
  // TODO: [key: string]: ValueObject<any>
}) => Promise<Either<DomainError, _TemplateResponse>>;

export type _TemplateBuilder = (options: {
  // TODO: [key: string]: any
}) => _TemplateService;

export const _templateBuilderService: _TemplateBuilder = (
  {
    // TODO: keyof _TemplateBuilder['options']
  }
) => async input => {
  // TODO: To implement
};
