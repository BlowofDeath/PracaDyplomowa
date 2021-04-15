import { gql } from "@apollo/client";

export const AGREEMENTS = gql`
  query agreements {
    agreements {
      id
      address
      city
      email
      company_name
      phone
      from
      to
      accepted
      Student {
        id
        index_number
        first_name
        last_name
        email
        color
      }
    }
  }
`;
