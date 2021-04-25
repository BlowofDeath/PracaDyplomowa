import { gql } from "apollo-server-express";

const documentFileType = gql`
  enum Status {
    accepted
    rejected
  }

  enum DocumentType {
    journal
    agreement
    personalData
  }

  type Query {
    getDocumentFile(PracticeAgreementId: ID!, type: DocumentType): DocumentFile
  }

  type DocumentFile {
    id: ID!
    status: Status
    type: DocumentType!
    rejectNote: String
  }

  type Mutation {
    createDocumentFile(
      file: Upload!
      PracticeAgreementId: ID!
      type: DocumentType
    ): DocumentFile
    changeDocumentFileStatus(
      id: ID!
      status: Status!
      rejectNote: String
    ): DocumentFile
  }
`;

export default documentFileType;
