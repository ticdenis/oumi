import { gql } from 'apollo-server';

// tslint:disable-next-line: variable-name
export const Input = gql`
  input ChangePasswordData {
    id: ID!
    newPassword: String!
    oldPassword: String!
  }

  input UpdateProfileData {
    firstname: String!
    id: ID!
    lastname: String!
    nickname: String!
    phone: String!
  }

  input UserRegistrationData {
    email: String!
    firstname: String!
    id: ID!
    lastname: String!
    nickname: String!
    password: String!
    phone: String!
  }

  # Query

  input ProfileData {
    id: ID!
  }

  input UserContactsData {
    id: ID!
  }

  input UserTokenData {
    email: String!
    password: String!
  }
`;
