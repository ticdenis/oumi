"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const input_1 = require("./types/input");
const mutation_1 = require("./types/mutation");
const query_1 = require("./types/query");
const type_1 = require("./types/type");
exports.typeDefs = apollo_server_1.gql `
  ${query_1.Query}
  ${mutation_1.Mutation}
  ${input_1.Input}
  ${type_1.Type}
`;
exports.resolvers = {
    Mutation: {},
    Query: {},
};
//# sourceMappingURL=schema.js.map