import { gql } from 'apollo-server';

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

  input NewContactRequestData {
    nickname: String!
    message: String
    requesterId: ID!
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
