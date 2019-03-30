"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Either_1 = require("fp-ts/lib/Either");
const function_1 = require("fp-ts/lib/function");
const domain_1 = require("../../domain");
exports.userRegistrationBuilderService = ({ commandRepository, eventPublisher, queryRepository, }) => async (input) => {
    const userExists = (await queryRepository.ofEmail(input.email).run()).swap();
    if (userExists.isLeft()) {
        return Either_1.left(domain_1.UserDomainError.alreadyExists(input.email.value));
    }
    const user = domain_1.User.create(input);
    await commandRepository.create(user);
    await eventPublisher.publish(...user.pullDomainEvents());
    return Either_1.right(function_1.constVoid());
};
//# sourceMappingURL=user-registration.service.js.map