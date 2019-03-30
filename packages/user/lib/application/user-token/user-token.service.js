"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@oumi-package/core");
const Either_1 = require("fp-ts/lib/Either");
const R = tslib_1.__importStar(require("ramda"));
const domain_1 = require("../../domain");
exports.userTokenBuilderService = ({ queryRepository, tokenFactory, }) => input => R.pipe(() => queryRepository.ofEmail(input.email).run(), core_1.then(R.ifElse(user => user.isRight() && user.value.password.equalsTo(input.password), user => tokenFactory.build(user.value).run(), () => Either_1.left(domain_1.UserDomainError.notExists(input.email.value)))))();
//# sourceMappingURL=user-token.service.js.map