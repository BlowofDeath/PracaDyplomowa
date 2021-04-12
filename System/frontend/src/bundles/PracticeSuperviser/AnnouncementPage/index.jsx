import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

import { ANNOUNCEMENTS } from "./queries";
import Page from "@components/Page";
import LoadingSpinner from "@components/LoadingSpinner";
import Announcement from "@components/Announcement";
import AddAnnouncementModal from "@components/AddAnnouncementModal";
import Tabs from "@components/Tabs";
import css from "./AnnouncementPage.module.css";

const AnnouncementPage = () => {
  const { loading, error, data, refetch } = useQuery(ANNOUNCEMENTS);
  const [openModal, setOpenModal] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    if (data) setAnnouncements(data.practiceAnnouncements);
  }, [data]);

  if (loading) return <LoadingSpinner />;
  if (error) return "error";
  return (
    <>
      <Page
        title="Ogłoszenia praktyk"
        button={
          <button onClick={() => setOpenModal(true)}>Dodaj ogłoszenie</button>
        }
      >
        <div className={css.tabs}>
          <Tabs
            value={tabValue}
            indicatorColor="primary"
            textColor="primary"
            onChange={(event, newValue) => setTabValue(newValue)}
          >
            <Tabs.Tab label="Zatwierdzone" />
            <Tabs.Tab label="Oczekujące" />
          </Tabs>
        </div>
        {announcements.map((announcement, index) => {
          if (tabValue === 0 && announcement.accepted)
            return (
              <Announcement
                key={index}
                {...announcement}
                announcements={announcements}
                setAnnouncements={setAnnouncements}
                refetch={refetch}
              />
            );
          if (tabValue === 1 && !announcement.accepted)
            return (
              <Announcement
                key={index}
                {...announcement}
                announcements={announcements}
                setAnnouncements={setAnnouncements}
                refetch={refetch}
              />
            );
          else return null;
        })}
      </Page>
      {openModal && (
        <AddAnnouncementModal
          open={openModal}
          setOpenModal={setOpenModal}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default AnnouncementPage;
