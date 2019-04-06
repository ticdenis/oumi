import { gql } from 'apollo-server';

// tslint:disable-next-line: variable-name
export const Query = gql`
  type Query {
    profile(input: ProfileData): ProfileResponse
    userContacts(input: UserContactsData): [UserContactResponse!]!
    userToken(input: UserTokenData): String!
  }
`;
