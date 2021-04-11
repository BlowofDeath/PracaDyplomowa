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
    address: String!
    phone: String
  }

  type CompanyAuth {
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
      address: String!
      phone: String
    ): CompanyAuth!
    loginCompany(email: String!, password: String!): CompanyAuth!
    registerCompany(
      token: String!
      first_name: String!
      last_name: String!
      password: String!
      confirm_password: String!
      name: String!
      city: String!
      address: String!
      phone: String
    ): CompanyAuth!
  }
`;

export default companyType;
