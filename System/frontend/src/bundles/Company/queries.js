import { gql } from "@apollo/client";

export const GET_COMPANY = gql`
  query meCompany {
    meCompany {
      id
      email
      phone
      name
      first_name
      last_name
      color
      city
      address
      phone
    }
  }
`;
