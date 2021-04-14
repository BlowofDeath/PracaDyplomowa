import { gql } from "@apollo/client";

export const CONFIRM_INVITATION_TOKEN = gql`
  mutation confirmInvitationToken($token: String!) {
    confirmInvitationToken(token: $token) {
      email
      userType
    }
  }
`;

export const REGISTER_COMPANY = gql`
  mutation registerCompany(
    $token: String!
    $first_name: String!
    $last_name: String!
    $password: String!
    $name: String!
    $city: String!
    $address: String!
    $phone: String
    $confirm_password: String!
  ) {
    registerCompany(
      token: $token
      first_name: $first_name
      last_name: $last_name
      password: $password
      name: $name
      city: $city
      phone: $phone
      confirm_password: $confirm_password
      address: $address
    ) {
      token
      company {
        id
        email
        first_name
        last_name
        color
        name
        city
        address
        phone
      }
    }
  }
`;

export const REGISTER_STUDENT = gql`
  mutation registerStudent(
    $token: String!
    $first_name: String!
    $last_name: String!
    $password: String!
    $confirm_password: String!
    $index_number: Int!
  ) {
    registerStudent(
      token: $token
      first_name: $first_name
      last_name: $last_name
      password: $password
      confirm_password: $confirm_password
      index_number: $index_number
    ) {
      token
      student {
        id
        email
        first_name
        last_name
        color
      }
    }
  }
`;

export const REGISTER_PRACTICE_SUPERVISER = gql`
  mutation registerPracticeSuperviser(
    $token: String!
    $first_name: String!
    $last_name: String!
    $password: String!
    $confirm_password: String!
  ) {
    registerPracticeSuperviser(
      token: $token
      first_name: $first_name
      last_name: $last_name
      password: $password
      confirm_password: $confirm_password
    ) {
      token
      practiceSuperviser {
        id
        email
        first_name
        last_name
        color
      }
    }
  }
`;