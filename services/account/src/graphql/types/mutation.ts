import { gql } from 'apollo-server';

// tslint:disable-next-line: variable-name
export const Mutation = gql`
  type Mutation {
    changePassword(input: ChangePasswordData!): Boolean
    updateProfile(input: UpdateProfileData!): Boolean
    userRegistration(input: UserRegistrationData!): Boolean
  }
`;
