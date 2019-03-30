"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../domain");
const _1 = require(".");
exports.profileBuilderService = ({ queryRepository, }) => async (input) => (await queryRepository.ofId(input.id).run())
    .mapLeft(() => domain_1.UserDomainError.notFound(input.id.value))
    .map(_1.profileDataTransformer);
//# sourceMappingURL=profile.service.js.map