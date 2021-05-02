import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useRecoilState } from "recoil";

import Tabs from "@components/Tabs";
import useAuth from "@hooks/useAuth";
import USER_TYPES from "@config/userTypes";
import Page from "@components/Page";
import { AGREEMENTS } from "./queries";
import css from "./AgreementPage.module.css";
import Agreement from "@components/Agreement";
import LoadingSpinner from "@components/LoadingSpinner";
import SearchInput from "@components/SearchInput";
import searchHelper from "@utility/searchHelper";
import YearPicker from "@components/YearPicker";
import { globalDatePickerValueAtom } from "@config/userRecoilAtoms";

const AgreementPage = () => {
  const { userType } = useAuth();
  const [yearFilter, setYearFilter] = useRecoilState(globalDatePickerValueAtom);
  const { loading, error, data, refetch } = useQuery(AGREEMENTS, {
    variables: { year: yearFilter },
  });
  const [tabValue, setTabValue] = useState(0);
  const [agreements, setAgreements] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (data) setAgreements(data.agreements);
  }, [data]);

  const getAgreements = (accepted) => {
    return (
      <>
        {agreements.map((agreement) => {
          if (
            !searchHelper(
              [
                agreement.Student.index_number,
                agreement.Student.first_name,
                agreement.Student.last_name,
                agreement.company_name,
                agreement.email,
                agreement.Student.email,
              ],
              search
            )
          )
            return null;
          return (
            (accepted ? agreement.accepted : !agreement.accepted) && (
              <Agreement
                key={agreement.id}
                {...agreement}
                agreements={agreements}
                setAgreements={setAgreements}
                refetch={refetch}
              />
            )
          );
        })}
      </>
    );
  };

  if (userType !== USER_TYPES.practiceSuperviser) return <Redirect to="/" />;
  if (loading) return <LoadingSpinner global />;
  return (
    <>
      {loading && <LoadingSpinner global />}
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
          <div>
            <YearPicker
              className={css.yearPicker}
              onChange={setYearFilter}
              year={yearFilter}
            />
            <SearchInput
              className={css.searchInput}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>
        <div className={css.agreements}>
          {tabValue === 0 && getAgreements(true)}
          {tabValue === 1 && getAgreements(false)}
        </div>
        {/*}
        {tabValue === 1 && <Companies />} */}
      </Page>
    </>
  );
};

export default AgreementPage;
