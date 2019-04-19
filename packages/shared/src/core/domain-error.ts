export abstract class DomainError extends Error {
  constructor(public readonly code: string, message: any) {
    super(`${message}`);
    this.name = this.constructor.name;
  }
}

export class CommandDomainError extends DomainError {}

export class EventDomainError extends DomainError {}

export class MessageDomainError extends DomainError {}

export class QueryDomainError extends DomainError {}

export class ValueObjectDomainError extends DomainError {}
