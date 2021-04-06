import { gql } from "apollo-server-express";

const companyType = gql`
  type Query {
    meCompany: Company
  }

  type Company {
    id: ID!
    email: String!
    first_name: String!
    last_name: String!
  }

  type companyAuth {
    token: String!
    company: Company!
  }

  type Mutation {
    createCompany(
      email: String!
      first_name: String!
      last_name: String!
      password: String!
    ): companyAuth!
    loginCompany(email: String!, password: String!): companyAuth!
  }
`;

export default companyType;
