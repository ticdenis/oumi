"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.Mutation = apollo_server_1.gql `
  type Mutation {
    newDebtRequest(input: NewDebtRequestData!): Boolean
  }
`;
//# sourceMappingURL=mutation.js.map