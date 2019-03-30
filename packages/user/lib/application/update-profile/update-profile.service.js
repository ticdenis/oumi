"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Either_1 = require("fp-ts/lib/Either");
const function_1 = require("fp-ts/lib/function");
const R = tslib_1.__importStar(require("ramda"));
const domain_1 = require("../../domain");
exports.updateProfileBuilderService = ({ commandRepository, eventPublisher, queryRepository, }) => async (input) => {
    const user = await queryRepository.ofId(input.id).run();
    if (user.isLeft()) {
        return Either_1.left(domain_1.UserDomainError.notFound(input.id.value));
    }
    user.value.updateProfile(R.omit(['id'], input));
    await commandRepository.updateProfile(user.value);
    await eventPublisher.publish(...user.value.pullDomainEvents());
    return Either_1.right(function_1.constVoid());
};
//# sourceMappingURL=update-profile.service.js.map