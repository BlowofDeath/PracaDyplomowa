import { gql } from "@apollo/client";

export const LOGIN_STUDENT = gql`
  mutation loginStudent($email: String!, $password: String!) {
    loginStudent(email: $email, password: $password) {
      token
      student {
        email
      }
    }
  }
`;

export default { LOGIN_STUDENT };
