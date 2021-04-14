import { gql } from "apollo-server-express";

const customScalarType = gql`
  scalar Date
`;

export default customScalarType;
