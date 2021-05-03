import { gql } from "@apollo/client";

export const ANNOUNCEMENTS = gql`
  query practiceAnnouncements {
    practiceAnnouncements {
      id
      header
      slots
      technologies
      description
      to
      from
      accepted
      phone
      email
      company_name
      updatedAt
      CompanyId
      Company {
        name
        first_name
        last_name
        color
      }
    }
  }
`;
