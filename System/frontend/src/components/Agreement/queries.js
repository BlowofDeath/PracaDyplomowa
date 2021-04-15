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
