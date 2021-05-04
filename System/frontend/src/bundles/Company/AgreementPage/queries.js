import { gql } from "@apollo/client";

export const AGREEMENTS = gql`
  query agreements($year: Date) {
    agreements(year: $year) {
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
      DocumentFiles {
        id
        status
        type
      }
      Company {
        id
      }
      company_accepted
    }
  }
`;