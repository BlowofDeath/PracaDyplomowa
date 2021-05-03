import { gql } from "@apollo/client";

export const GET_STUDENT = gql`
  query meStudent {
    meStudent {
      email
      first_name
      last_name
      index_number
    }
  }
`;
