import { gql } from "apollo-server-express";

const practiceSuperviserType = gql`
  type Query {
    mePracticeSuperviser: PracticeSuperviser
  }

  type PracticeSuperviser {
    id: ID!
    email: String!
    first_name: String!
    last_name: String!
    color: String!
  }

  type PracticeSuperviserAuth {
    token: String!
    practiceSuperviser: PracticeSuperviser!
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
    registerPracticeSuperviser(
      token: String!
      first_name: String!
      last_name: String!
      password: String!
      confirm_password: String!
    ): PracticeSuperviserAuth!
    updatePracticeSuperviserProfile(
      first_name: String
      last_name: String
      password: String
      confirmPassword: String
    ): PracticeSuperviser
  }
`;

export default practiceSuperviserType;
