import { gql } from "@apollo/client";

export const GET_STUDENTS = gql`
  query students {
    students {
      id
      index_number
      email
      first_name
      last_name
      color
    }
  }
`;
