import { gql } from "@apollo/client";

export const ADD_ANNOUNCEMENT = gql`
  mutation createPracticeAnnouncement(
    $header: String!
    $slots: Int!
    $technologies: String!
    $description: String
    $from: Date!
    $to: Date!
  ) {
    createPracticeAnnouncement(
      header: $header
      slots: $slots
      technologies: $technologies
      description: $description
      from: $from
      to: $to
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
