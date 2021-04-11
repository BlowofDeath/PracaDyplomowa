import { gql } from "@apollo/client";

export const LOGIN_STUDENT = gql`
  mutation loginStudent($email: String!, $password: String!) {
    loginStudent(email: $email, password: $password) {
      token
      student {
        id
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
        id
        email
      }
    }
  }
`;

export const LOGIN_COMPANY = gql`
  mutation loginCompany($email: String!, $password: String!) {
    loginCompany(email: $email, password: $password) {
      token
      company {
        id
        email
        phone
        name
      }
    }
  }
`;

export default { LOGIN_STUDENT, LOGIN_PRACTICE_SUPERVISER, LOGIN_COMPANY };
