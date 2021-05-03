import { gql } from "@apollo/client";

export const REJECT_COMPANY_AGREEMENT = gql`
  mutation rejectCompanyAgreement($id: ID!) {
    rejectCompanyAgreement(id: $id) {
      id
    }
  }
`;

export const CONFIRM_PRACTICE_AGREEMENT = gql`
  mutation confirmPracticeAgreement($id: ID!) {
    confirmPracticeAgreement(id: $id) {
      id
    }
  }
`;
