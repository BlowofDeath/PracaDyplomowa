import { gql } from "@apollo/client";

export const DELETE_PRACTICE_AGREEMENT = gql`
  mutation deletePracticeAgreement($id: ID!) {
    deletePracticeAgreement(id: $id)
  }
`;

export const CONFIRM_PRACTICE_AGREEMENT = gql`
  mutation confirmPracticeAgreement($id: ID!) {
    confirmPracticeAgreement(id: $id) {
      id
    }
  }
`;

export const CHANGE_DOCUMENT_STATUS = gql`
  mutation changeDocumentFileStatus(
    $id: ID!
    $status: Status!
    $rejectNote: String
  ) {
    changeDocumentFileStatus(
      id: $id
      status: $status
      rejectNote: $rejectNote
    ) {
      id
      status
      type
      rejectNote
    }
  }
`;
