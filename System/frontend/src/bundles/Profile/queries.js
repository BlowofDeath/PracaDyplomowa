import { gql } from "@apollo/client";

export const UPDATE_STUDENT = gql`
  mutation updateStudentProfile(
    $first_name: String
    $last_name: String
    $password: String
    $confirmPassword: String
    $index_number: String
  ) {
    updateStudentProfile(
      first_name: $first_name
      last_name: $last_name
      password: $password
      confirmPassword: $confirmPassword
      index_number: $index_number
    ) {
      id
      email
      first_name
      last_name
      index_number
    }
  }
`;

export const UPDATE_COMPANY = gql`
  mutation updateCompanyProfile(
    $first_name: String
    $last_name: String
    $password: String
    $confirmPassword: String
    $name: String
    $city: String
    $address: String
    $phone: String
  ) {
    updateCompanyProfile(
      first_name: $first_name
      last_name: $last_name
      password: $password
      confirmPassword: $confirmPassword
      name: $name
      city: $city
      address: $address
      phone: $phone
    ) {
      id
      email
      phone
      name
      first_name
      last_name
      color
      city
      address
      phone
    }
  }
`;

export const UPDATE_PRACTICE_SUPERVISER = gql`
  mutation updatePracticeSuperviserProfile(
    $first_name: String
    $last_name: String
    $password: String
    $confirmPassword: String
  ) {
    updatePracticeSuperviserProfile(
      first_name: $first_name
      last_name: $last_name
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      first_name
      last_name
    }
  }
`;
