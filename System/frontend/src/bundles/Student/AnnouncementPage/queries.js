import { gql } from "@apollo/client";

export const ANNOUNCEMENTS = gql`
  query practiceAnnouncements {
    practiceAnnouncements {
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
    }
  }
`;
