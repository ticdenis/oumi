"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = require("./schema");
exports.loadApolloServer = (container) => new apollo_server_express_1.ApolloServer({
    context: () => {
        return { container };
    },
    resolvers: schema_1.resolvers,
    typeDefs: schema_1.typeDefs,
});
//# sourceMappingURL=server.js.map