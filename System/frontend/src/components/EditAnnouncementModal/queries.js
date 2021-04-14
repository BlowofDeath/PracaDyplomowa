import { gql } from "@apollo/client";

export const EDIT_ANNOUNCEMENT = gql`
  mutation editPracticeAnnouncement(
    $id: ID!
    $header: String
    $slots: Int
    $technologies: String
    $description: String
    $from: Date
    $to: Date
    $email: String
    $phone: String
    $company_name: String
  ) {
    editPracticeAnnouncement(
      id: $id
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
      id
      header
      slots
      description
      technologies
      from
      to
      phone
      email
      company_name
    }
  }
`;
