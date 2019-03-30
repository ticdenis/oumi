"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("@oumi-package/user/lib");
const config_1 = require("../../config");
exports.resolvers = {
    Mutation: {
        userRegistration: async (_, args, context) => {
            await context.container
                .get(config_1.SERVICE_ID.BUS.COMMAND)
                .dispatch(new lib_1.UserRegistrationCommand(args.input));
            return null;
        },
    },
    Query: {
        hello: () => 'hello',
    },
};
//# sourceMappingURL=resolvers.js.map