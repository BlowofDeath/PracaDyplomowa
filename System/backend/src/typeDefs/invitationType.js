import { gql } from "apollo-server-express";

const companyType = gql`
  type Invitation {
    userType: String!
    email: String!
  }

  type Mutation {
    createInvite(email: String!, userType: String!): Invitation!
    confirmInvitationToken(token: String!): Invitation!
  }
`;

export default companyType;
