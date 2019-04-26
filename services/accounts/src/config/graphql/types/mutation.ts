import { gql } from 'apollo-server';

export const Mutation = gql`
  type Mutation {
    changePassword(input: ChangePasswordData!): Boolean
    updateProfile(input: UpdateProfileData!): Boolean
    userRegistration(input: UserRegistrationData!): Boolean
    newContactRequest(input: NewContactRequestData!): Boolean
    confirmContactRequest(input: ConfirmContactRequestData!): Boolean
  }
`;
