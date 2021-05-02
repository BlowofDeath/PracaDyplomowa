import { gql } from "@apollo/client";

export const GET_COMPANIES = gql`
  query companies($year: Date) {
    companies(year: $year) {
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
