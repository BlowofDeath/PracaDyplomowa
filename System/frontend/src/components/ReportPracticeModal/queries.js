import { gql } from "@apollo/client";

export const CREATE_PRACTICE_AGREEMENT = gql`
  mutation createPracticeAgreement(
    $city: String!
    $address: String!
    $from: Date!
    $to: Date!
    $email: String!
    $phone: String!
    $company_name: String!
  ) {
    createPracticeAgreement(
      city: $city
      address: $address
      from: $from
      to: $to
      phone: $phone
      email: $email
      company_name: $company_name
    ) {
      city
      address
      email
      company_name
      from
      to
      accepted
    }
  }
`;
