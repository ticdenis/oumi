export abstract class DomainError extends Error {
  constructor(public readonly code: string, message: any) {
    super(`${message}`);
    this.name = this.constructor.name;
    this.code = code;
  }
}

export class CommandDomainError extends DomainError {}

export class EventDomainError extends DomainError {}

export class MessageDomainError extends DomainError {}

export class QueryDomainError extends DomainError {}

export class RequestDomainError extends DomainError {}

export class ValueObjectDomainError extends DomainError {}
