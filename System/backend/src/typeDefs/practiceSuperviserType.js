import { gql } from "apollo-server-express";

const practiceSuperviserType = gql`
  type Query {
    mePracticeSuperviser: PracticeSuperviser!
  }

  type PracticeSuperviser {
    email: String!
    first_name: String!
    last_name: String!
    password: String!
  }

  type PracticeSuperviserAuth {
    practiceSuperviser: PracticeSuperviser!
    token: String!
  }

  type Mutation {
    createPracticeSuperviser(
      email: String!
      first_name: String!
      last_name: String!
      password: String!
    ): PracticeSuperviserAuth!
    loginPracticeSuperviser(
      email: String!
      password: String!
    ): PracticeSuperviserAuth!
  }
`;

export default practiceSuperviserType;
