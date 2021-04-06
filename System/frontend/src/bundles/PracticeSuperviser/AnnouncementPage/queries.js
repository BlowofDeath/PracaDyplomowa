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
    }
  }
`;
