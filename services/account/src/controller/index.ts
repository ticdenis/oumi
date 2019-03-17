import { Errors } from 'io-ts';

export interface ErrorFormat {
  code: string;
  message: string;
}

export interface JSONResponse<D, E = ErrorFormat> {
  data: D | null;
  errors: E[] | null;
}

export const okResponse = <D>(data: D = null): JSONResponse<D, null> => ({
  data,
  errors: null,
});

export const koResponse = <E>(errors: E[] = null): JSONResponse<null, E> => ({
  data: null,
  errors,
});

export const validationReporter = (errors: Errors): ErrorFormat[] =>
  errors.map(error => ({
    code: 'validation_error',
    message: `Expected type '${
      error.context[error.context.length - 1].type.name
    }' on '${
      error.context[error.context.length - 1].key
    }' field, found '${JSON.stringify(error.value)}'.`,
  }));

export * from './healthz-get.controller';
export * from './user-registration-post.controller';
