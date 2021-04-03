import React from "react";
import { gql, useQuery } from "@apollo/client";
import { ANNOUNCEMENTS } from "./queries";
import Page from "@components/Page";
import LoadingSpinner from "@components/LoadingSpinner";
import Announcement from "@components/Announcement";

const AnnouncementPage = () => {
  const { loading, error, data } = useQuery(ANNOUNCEMENTS);

  console.log(data);
  if (loading) return <LoadingSpinner />;
  if (error) return "error";
  return (
    <Page title="Ogłoszenia praktyk" button={<button>Dodaj ogłoszenie</button>}>
      {data.practiceAnnouncements.map((announcement, index) => {
        return <Announcement key={index} {...announcement} />;
      })}
    </Page>
  );
};

export default AnnouncementPage;
