import { gql } from "@apollo/client";

export const GET_COMPANY = gql`
  query meCompany {
    meCompany {
      email
    }
  }
`;
