import { gql } from "apollo-server-express";

const practiceAgreementType = gql`
  type Query {
    testAnnouncement: String!
    myPracticeAgreements: [PracticeAgreement]
  }

  type PracticeAgreement {
    id: ID!
    from: Date!
    to: Date!
    phone: String!
    email: String!
    accepted: Boolean!
    company_name: String!
    city: String!
    address: String!
    StudentId: ID!
  }

  type Mutation {
    createPracticeAgreement(
      from: Date!
      to: Date!
      phone: String!
      email: String!
      company_name: String!
      city: String!
      address: String!
    ): PracticeAgreement
    deletePracticeAgreement(id: ID!): Boolean
    confirmPracticeAgreement(id: ID!): PracticeAgreement
    editPracticeAgreement(
      id: ID!
      from: Date!
      to: Date!
      phone: String!
      email: String!
      accepted: Boolean!
      company_name: String!
      city: String!
      address: String!
    ): PracticeAgreement
  }
`;

export default practiceAgreementType;
