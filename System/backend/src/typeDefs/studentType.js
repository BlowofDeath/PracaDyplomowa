import { gql } from "apollo-server-express";

const studentType = gql`
  type Query {
    test: String
    meStudent: Student
  }

  type Student {
    index_number: Int!
    email: String!
    first_name: String!
    last_name: String!
  }

  type StudentAuth {
    student: Student!
    token: String!
  }

  type Mutation {
    createStudent(
      index_number: Int!
      email: String!
      first_name: String!
      last_name: String!
      password: String!
    ): StudentAuth!
    loginStudent(email: String!, password: String!): StudentAuth!
  }
`;

export default studentType;
