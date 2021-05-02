import { gql } from "apollo-server-express";

const practiceAnnouncementType = gql`
  type Query {
    testAnnouncement: String!
    practiceAnnouncements: [PracticeAnnouncement]
  }

  type PracticeAnnouncement {
    id: ID!
    header: String!
    slots: String!
    description: String!
    technologies: String!
    from: Date!
    to: Date!
    phone: String
    email: String
    accepted: Boolean!
    company_name: String
    CompanyId: ID
    updatedAt: Date
    createdAt: Date
  }

  type Mutation {
    createPracticeAnnouncement(
      header: String!
      slots: Int!
      description: String
      technologies: String!
      from: Date!
      to: Date!
      phone: String
      email: String
      company_name: String
    ): PracticeAnnouncement
    deletePracticeAnnouncement(id: ID!): Boolean
    confirmPracticeAnnouncement(id: ID!): PracticeAnnouncement
    editPracticeAnnouncement(
      id: ID!
      header: String
      slots: Int
      description: String
      technologies: String
      from: Date
      to: Date
      phone: String
      email: String
      company_name: String
    ): PracticeAnnouncement
  }
`;

export default practiceAnnouncementType;
