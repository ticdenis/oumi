"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oumi-package/core");
class UserDomainError extends core_1.DomainError {
    constructor(code, message) {
        super(code, message);
        this.code = code;
    }
    static alreadyExists(email) {
        return new UserDomainError('USER_ALREADY_EXISTS', `The <${email}> user email already exists`);
    }
    static notFound(id) {
        return new UserDomainError('USER_NOT_FOUND', `The <${id}> user id not found`);
    }
    static notExists(email) {
        return new UserDomainError('USER_NOT_EXISTS', `The <${email}> user email not exists`);
    }
}
exports.UserDomainError = UserDomainError;
//# sourceMappingURL=user.errors.js.map