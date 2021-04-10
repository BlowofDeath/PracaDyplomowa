import { gql } from "@apollo/client";

export const CREATE_INVITE = gql`
  mutation createInvite($email: String!, $userType: String!) {
    createInvite(email: $email, userType: $userType) {
      email
      userType
    }
  }
`;
