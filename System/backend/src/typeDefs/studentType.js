import { gql } from "apollo-server-express";

const studentType = gql`
  type Query {
    test: String
    meStudent: Student
    students: [Student]
  }

  type Student {
    id: ID!
    index_number: Int!
    email: String!
    first_name: String!
    last_name: String!
    color: String!
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
