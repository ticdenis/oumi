"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../domain");
exports.okResponse = (data = null) => ({
    data,
    errors: null,
});
exports.koResponse = (errors = null) => ({
    data: null,
    errors: !errors
        ? null
        : errors.map(err => err instanceof domain_1.DomainError
            ? { code: err.code, message: err.message }
            : err instanceof Error
                ? {
                    code: err.hasOwnProperty('code') ? err.code : err.name,
                    message: err.message,
                    meta: err,
                }
                : err),
});
exports.validationReporter = (errors) => errors.map(error => ({
    code: 'validation_error',
    message: `Expected type '${error.context[error.context.length - 1].type.name}' on '${error.context[error.context.length - 1].key}' field, found '${JSON.stringify(error.value)}'.`,
}));
//# sourceMappingURL=dsl.js.map