import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import Practice from "@components/Practice";
import css from "./MyPractice.module.css";
import Page from "@components/Page";
import ReportPracticeModal from "@components/ReportPracticeModal";
import { MY_PRACTICE_AGREEMENTS } from "./queries";
import LoadingSpinner from "@components/LoadingSpinner";

const MyPractice = () => {
  const [openModal, setOpenModal] = useState(false);
  const { data, loading, error, refetch } = useQuery(MY_PRACTICE_AGREEMENTS);
  console.log(data);
  if (loading) return <LoadingSpinner />;
  return (
    <>
      <Page
        title="Moja praktyka"
        button={
          <>
            <div>
              <button onClick={() => setOpenModal(true)}>Zgłoś praktykę</button>
            </div>
          </>
        }
      >
        {data.myPracticeAgreements.map((practice) => (
          <Practice key={practice.id} {...practice} />
        ))}
      </Page>
      {openModal && (
        <ReportPracticeModal
          open={openModal}
          setOpenModal={setOpenModal}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default MyPractice;
