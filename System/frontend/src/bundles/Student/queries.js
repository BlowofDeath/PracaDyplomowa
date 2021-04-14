import { gql } from "@apollo/client";

export const GET_STUDENT = gql`
  query meStudent {
    meStudent {
      email
    }
  }
`;
