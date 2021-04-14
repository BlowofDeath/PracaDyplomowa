import { gql } from "@apollo/client";

export const ADD_ANNOUNCEMENT = gql`
  mutation createPracticeAnnouncement(
    $header: String!
    $slots: Int!
    $technologies: String!
    $description: String
    $from: Date!
    $to: Date!
    $email: String
    $phone: String
    $company_name: String
  ) {
    createPracticeAnnouncement(
      header: $header
      slots: $slots
      technologies: $technologies
      description: $description
      from: $from
      to: $to
      phone: $phone
      email: $email
      company_name: $company_name
    ) {
      header
      slots
      description
      technologies
      from
      to
    }
  }
`;
