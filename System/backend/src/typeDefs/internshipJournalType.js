import { gql } from "apollo-server-express";

const internshipJournalType = gql`
  type Query {
    getJournal(PracticeAgreementId: ID!): InternshipJournal
  }

  type InternshipJournal {
    id: ID!
    accepted: Boolean!
  }

  type Mutation {
    createJournal(file: Upload!, PracticeAgreementId: ID!): InternshipJournal
  }
`;

export default internshipJournalType;
