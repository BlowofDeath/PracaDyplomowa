import { gql } from "apollo-server-express";

const practiceAnnouncementType = gql`
  scalar Date

  type Query {
    testAnnouncement: String!
    practiceAnnouncements: [PracticeAnnouncement]
  }

  type PracticeAnnouncement {
    header: String!
    slots: String!
    description: String!
    technologies: String!
    from: Date!
    to: Date!
    accepted: Boolean!
  }

  type Mutation {
    createPracticeAnnouncement(
      header: String!
      slots: Int!
      description: String
      technologies: String!
      from: Date!
      to: Date!
    ): PracticeAnnouncement
  }
`;

export default practiceAnnouncementType;
