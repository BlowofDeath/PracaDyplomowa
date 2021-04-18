import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Route, useRouteMatch } from "react-router-dom";

import Practice from "@components/Practice";
import css from "./MyPractice.module.css";
import Page from "@components/Page";
import ReportPracticeModal from "@components/ReportPracticeModal";
import { MY_PRACTICE_AGREEMENTS } from "./queries";
import LoadingSpinner from "@components/LoadingSpinner";
import Journal from "./Journal";

const MyPractice = () => {
  const [openModal, setOpenModal] = useState(false);
  const { data, loading, error, refetch } = useQuery(MY_PRACTICE_AGREEMENTS);
  const match = useRouteMatch();
  if (loading) return <LoadingSpinner />;
  return (
    <>
      <Route exact path={`${match.path}/`}>
        <Page
          title="Moja praktyka"
          button={
            <>
              <div>
                <button onClick={() => setOpenModal(true)}>
                  Zgłoś praktykę
                </button>
              </div>
            </>
          }
        >
          {data.myPracticeAgreements.map((practice) => (
            <Practice
              key={practice.id}
              {...practice}
              dictionaryUrl={`${match.path}/dictionary`}
            />
          ))}
        </Page>
        {openModal && (
          <ReportPracticeModal
            open={openModal}
            setOpenModal={setOpenModal}
            refetch={refetch}
          />
        )}
      </Route>
      <Route path={`${match.path}/dictionary/:agreementId`}>
        <Page title="Dziennik">
          <Journal />
        </Page>
      </Route>
    </>
  );
};

export default MyPractice;
