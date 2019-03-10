export type DomainError = (code: string, message: string) => Error;

export const domainError: DomainError = (code, message) => {
  const error = new Error(message);

  error.name = code;

  return error;
};
