import { gql } from "apollo-server-express";

const studentType = gql`
  type Query {
    student: String
  }
`;

export default studentType;
