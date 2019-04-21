export declare abstract class DomainError extends Error {
    readonly code: string;
    constructor(code: string, message: any);
}
export declare class CommandDomainError extends DomainError {
}
export declare class EventDomainError extends DomainError {
}
export declare class MessageDomainError extends DomainError {
}
export declare class QueryDomainError extends DomainError {
}
export declare class ValueObjectDomainError extends DomainError {
}
//# sourceMappingURL=domain-error.d.ts.map