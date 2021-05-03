import { gql } from "@apollo/client";

export const DELETE_PRACTICE_ANNOUNCEMENT = gql`
  mutation deletePracticeAnnouncement($id: ID!) {
    deletePracticeAnnouncement(id: $id)
  }
`;

export const CONFIRM_PRACTICE_ANNOUNCEMENT = gql`
  mutation confirmPracticeAnnouncement($id: ID!) {
    confirmPracticeAnnouncement(id: $id) {
      id
      header
    }
  }
`;

export const CREATE_APPLICATION = gql`
  mutation createApplication(
    $id: ID!
    $CompanyId: ID!
    $from: Date!
    $to: Date!
  ) {
    createApplication(id: $id, CompanyId: $CompanyId, from: $from, to: $to) {
      id
    }
  }
`;
