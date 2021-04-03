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

export const LOGIN_PRACTICE_SUPERVISER = gql`
  mutation loginPracticeSuperviser($email: String!, $password: String!) {
    loginPracticeSuperviser(email: $email, password: $password) {
      token
      practiceSuperviser {
        email
      }
    }
  }
`;

export default { LOGIN_STUDENT, LOGIN_PRACTICE_SUPERVISER };
