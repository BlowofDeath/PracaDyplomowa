import { gql } from "apollo-server-express";

const customScalarType = gql`
  scalar Date
  scalar Upload
`;

export default customScalarType;
