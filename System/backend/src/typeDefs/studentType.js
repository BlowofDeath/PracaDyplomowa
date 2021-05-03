import { gql } from "apollo-server-express";

const studentType = gql`
  type Query {
    test: String
    meStudent: Student
    students(year: Date): [Student]
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
    registerStudent(
      token: String!
      first_name: String!
      last_name: String!
      password: String!
      confirm_password: String!
      index_number: Int!
    ): StudentAuth!
    updateStudentProfile(
      first_name: String
      last_name: String
      password: String
      confirmPassword: String
    ): Student
  }
`;

export default studentType;
