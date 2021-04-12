import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useRecoilState } from "recoil";

import { ANNOUNCEMENTS } from "./queries";
import LoadingSpinner from "@components/LoadingSpinner";
import AddAnnouncementModal from "@components/AddAnnouncementModal";
import Tabs from "@components/Tabs";
import css from "./AnnouncementPage.module.css";
import Announcement from "@components/Announcement";
import Page from "@components/Page";
import { companyAtom } from "@config/userRecoilAtoms";

const AnnouncementPage = () => {
  const { loading, error, data, refetch } = useQuery(ANNOUNCEMENTS);
  const [openModal, setOpenModal] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [company] = useRecoilState(companyAtom);

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
            <Tabs.Tab label="Wszystkie ogłoszenia" />
            <Tabs.Tab label="Moje ogłoszenia" />
          </Tabs>
        </div>
        {announcements.map((announcement, index) => {
          if (tabValue === 0)
            return (
              <Announcement
                refetch={refetch}
                key={index}
                {...announcement}
                announcements={announcements}
                setAnnouncements={setAnnouncements}
              />
            );
          if (tabValue === 1 && company?.id === announcement.CompanyId)
            return (
              <Announcement
                refetch={refetch}
                key={index}
                {...announcement}
                announcements={announcements}
                setAnnouncements={setAnnouncements}
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
