import { gql } from "@apollo/client";

export const MY_PRACTICE_AGREEMENTS = gql`
  query myPracticeAgreements {
    myPracticeAgreements {
      id
      address
      city
      email
      company_name
      phone
      from
      to
      accepted
      DocumentFiles {
        id
        status
        type
        rejectNote
      }
      Company {
        id
        first_name
        last_name
        name
        color
      }
      company_accepted
    }
  }
`;
