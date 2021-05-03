import { gql } from "apollo-server-express";

const practiceAgreementType = gql`
  type Query {
    myPracticeAgreements: [PracticeAgreement]
    agreements(year: Date): [PracticeAgreement]
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
    Student: Student
    DocumentFiles: [DocumentFile]
    Company: Company
    company_accepted: Boolean
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
    createApplication(
      id: ID!
      CompanyId: ID!
      from: Date!
      to: Date!
    ): PracticeAgreement
    rejectCompanyAgreement(id: ID!): PracticeAgreement
  }
`;

export default practiceAgreementType;
