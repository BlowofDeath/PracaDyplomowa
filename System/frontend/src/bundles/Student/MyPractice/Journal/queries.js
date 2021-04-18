import { gql } from "@apollo/client";

export const CREATE_JOURNAL = gql`
  mutation createJournal($file: Upload!, $PracticeAgreementId: ID!) {
    createJournal(file: $file, PracticeAgreementId: $PracticeAgreementId) {
      accepted
    }
  }
`;

export const GET_JOURNAL = gql`
  query getJournal($PracticeAgreementId: ID!) {
    getJournal(PracticeAgreementId: $PracticeAgreementId) {
      id
      accepted
    }
  }
`;
