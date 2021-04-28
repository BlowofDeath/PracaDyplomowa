import { gql } from "@apollo/client";

export const CREATE_DOCUMENT = gql`
  mutation createDocumentFile(
    $file: Upload!
    $PracticeAgreementId: ID!
    $type: DocumentType
  ) {
    createDocumentFile(
      file: $file
      PracticeAgreementId: $PracticeAgreementId
      type: $type
    ) {
      status
    }
  }
`;
