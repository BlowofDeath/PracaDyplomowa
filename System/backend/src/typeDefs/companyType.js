import { gql } from "apollo-server-express";

const companyType = gql`
  type Query {
    meCompany: Company
    companies: [Company]
  }

  type Company {
    id: ID!
    email: String!
    first_name: String!
    last_name: String!
    color: String!
    name: String!
    city: String!
    adress: String!
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
      name: String!
      city: String!
      adress: String!
    ): companyAuth!
    loginCompany(email: String!, password: String!): companyAuth!
  }
`;

export default companyType;
