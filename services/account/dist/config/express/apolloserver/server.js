"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const resolvers_1 = require("../../../graphql/apolloserver/resolvers");
const schema_1 = require("../../../graphql/apolloserver/schema");
exports.loadApolloServer = (container) => new apollo_server_express_1.ApolloServer({
    context: () => {
        return { container };
    },
    resolvers: resolvers_1.resolvers,
    typeDefs: schema_1.typeDefs,
});
//# sourceMappingURL=server.js.map