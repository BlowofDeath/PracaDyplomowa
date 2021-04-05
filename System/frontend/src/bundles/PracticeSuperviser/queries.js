import { gql } from "@apollo/client";

export const GET_PRACTICE_SUPERVISER = gql`
  query mePracticeSuperviser {
    mePracticeSuperviser {
      email
    }
  }
`;
