"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.Input = apollo_server_1.gql `
  input NewDebtRequestData {
    amount: Float!
    concept: String!
    currency: String!
    debtorId: String!
    id: ID!
    initialDate: String;
    limitDate: String;
    loanerId: String!
  }
`;
//# sourceMappingURL=input.js.map