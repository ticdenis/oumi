"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DomainError extends Error {
    constructor(code, message) {
        super(`${message}`);
        this.code = code;
        this.name = this.constructor.name;
    }
}
exports.DomainError = DomainError;
class CommandDomainError extends DomainError {
}
exports.CommandDomainError = CommandDomainError;
class EventDomainError extends DomainError {
}
exports.EventDomainError = EventDomainError;
class MessageDomainError extends DomainError {
}
exports.MessageDomainError = MessageDomainError;
class QueryDomainError extends DomainError {
}
exports.QueryDomainError = QueryDomainError;
class RequestDomainError extends DomainError {
}
exports.RequestDomainError = RequestDomainError;
class ValueObjectDomainError extends DomainError {
}
exports.ValueObjectDomainError = ValueObjectDomainError;
//# sourceMappingURL=domain-error.js.map