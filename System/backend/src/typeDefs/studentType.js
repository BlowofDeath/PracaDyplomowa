import { gql } from "apollo-server-express";

const studentType = gql`
  type Query {
    me: Student!
    student(id: ID!): Student!
  }

  type Student {
    index_number: Int!
    email: String!
    first_name: String!
    last_name: String!
    password: String!
  }

  type StudentAuth {
    user: Student!
    token: String!
  }
`;

export default studentType;
