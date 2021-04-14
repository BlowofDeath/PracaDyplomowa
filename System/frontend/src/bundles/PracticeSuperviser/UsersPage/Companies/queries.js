import { gql } from "@apollo/client";

export const GET_COMPANIES = gql`
  query companies {
    companies {
      id
      name
      city
      address
      email
      first_name
      last_name
      color
    }
  }
`;