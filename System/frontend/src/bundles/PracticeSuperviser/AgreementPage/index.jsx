import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Tabs from "@components/Tabs";
import useAuth from "@hooks/useAuth";
import USER_TYPES from "@config/userTypes";
import Page from "@components/Page";
import { AGREEMENTS } from "./queries";
import css from "./AgreementPage.module.css";
import Agreement from "@components/Agreement";
import LoadingSpinner from "@components/LoadingSpinner";

const AgreementPage = () => {
  const { userType } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const { loading, error, data } = useQuery(AGREEMENTS);
  const [tabValue, setTabValue] = useState(0);
  const [agreements, setAgreements] = useState([]);

  useEffect(() => {
    if (data) setAgreements(data.agreements);
  }, [data]);

  if (loading) return <LoadingSpinner />;
  //   if (error) return "error";
  if (userType !== USER_TYPES.practiceSuperviser) return <Redirect to="/" />;
  return (
    <>
      <Page title="Umowy">
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
        <div className={css.agreements}>
          {tabValue === 0 && (
            <>
              {agreements.map(
                (agreement) =>
                  agreement.accepted && (
                    <Agreement
                      key={agreement.id}
                      {...agreement}
                      agreements={agreements}
                      setAgreements={setAgreements}
                    />
                  )
              )}
            </>
          )}
          {tabValue === 1 && (
            <>
              {agreements.map(
                (agreement) =>
                  !agreement.accepted && (
                    <Agreement
                      key={agreement.id}
                      {...agreement}
                      agreements={agreements}
                      setAgreements={setAgreements}
                    />
                  )
              )}
            </>
          )}
        </div>
        {/*}
        {tabValue === 1 && <Companies />} */}
      </Page>
    </>
  );
};

export default AgreementPage;
