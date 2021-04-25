import { gql } from "@apollo/client";

export const CREATE_JOURNAL = gql`
  mutation createDocumentFile($file: Upload!, $PracticeAgreementId: ID!) {
    createDocumentFile(
      file: $file
      PracticeAgreementId: $PracticeAgreementId
      type: journal
    ) {
      status
    }
  }
`;

export const GET_JOURNAL = gql`
  query getDocumentFile($PracticeAgreementId: ID!) {
    getDocumentFile(PracticeAgreementId: $PracticeAgreementId, type: journal) {
      id
      status
    }
  }
`;
