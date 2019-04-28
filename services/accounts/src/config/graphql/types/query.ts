import { gql } from 'apollo-server';

export const Query = gql`
  type Query {
    profile(input: ProfileData): ProfileResponse
    userContacts(input: UserContactsData): [UserContactResponse!]!
    contactRequests(input: ContactRequestsData): [ContactRequestResponse!]!
    userToken(input: UserTokenData): String!
  }
`;
