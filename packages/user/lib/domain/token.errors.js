"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oumi-package/core");
class TokenDomainError extends core_1.DomainError {
    constructor(code, message) {
        super(code, message);
        this.code = code;
    }
    static invalidPayload(payload) {
        return new TokenDomainError('TOKEN_INVALID_PAYLOAD', `The token payload <${JSON.stringify(payload)}> is invalid`);
    }
    static notValid(token) {
        return new TokenDomainError('TOKEN_NOT_VALID', `The token <${token}> is not valid`);
    }
    static hasExpired(token) {
        return new TokenDomainError('TOKEN_HAS_EXPIRED', `The token <${token}> has expired`);
    }
}
exports.TokenDomainError = TokenDomainError;
//# sourceMappingURL=token.errors.js.map