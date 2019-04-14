import { DomainError } from "@oumi-package/core/lib";

import { Either, right } from "fp-ts/lib/Either";
import { constVoid } from "fp-ts/lib/function";

export type _TemplateService = (input: {
  // TODO: [key: string]: ValueObject<any>
}) => Promise<Either<DomainError, void>>;

export type _TemplateBuilder = (options: {
  // TODO: [key: string]: any
}) => _TemplateService;

export const _templateBuilderService: _TemplateBuilder = (
  {
    // TODO: keyof _TemplateBuilder['options']
  }
) => async input => {
  // TODO: To implement

  return right(constVoid());
};
