import React, { useState } from "react";
import Announcement from "@components/Announcement";
import Page from "@components/Page";
import { gql, useQuery } from "@apollo/client";
import { ANNOUNCEMENTS } from "./queries";
import LoadingSpinner from "@components/LoadingSpinner";
import Modal from "@components/Modal";

const AnnouncementPage = () => {
  const { loading, error, data, refetch } = useQuery(ANNOUNCEMENTS);
  const [openModal, setOpenModal] = useState(false);

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
        {data.practiceAnnouncements.map((announcement, index) => {
          return <Announcement key={index} {...announcement} />;
        })}
      </Page>

      {openModal && (
        <Modal open={openModal} setOpenModal={setOpenModal} refetch={refetch} />
      )}
    </>
  );
};

export default AnnouncementPage;
