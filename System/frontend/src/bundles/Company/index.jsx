import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useLazyQuery } from "@apollo/client";

import css from "./Company.module.css";
import AnnouncementPage from "./AnnouncementPage";
import { companyAtom } from "@config/userRecoilAtoms";
import { GET_COMPANY } from "./queries.js";

const Company = () => {
  const [company, setCompany] = useRecoilState(companyAtom);
  const [getCompany, { data }] = useLazyQuery(GET_COMPANY);

  useEffect(() => {
    if (!company) {
      getCompany();
    }
  }, [company, getCompany]);

  useEffect(() => {
    if (data) setCompany(data.meCompany);
  }, [data, setCompany]);
  return (
    <>
      <Switch>
        <Route exact path="/">
          <AnnouncementPage />
        </Route>
        {/* <Route exact path="/reportpractice">
              <ReportPractice />
            </Route>
            <Route exact path="/agreement">
              <AgreementPage />
            </Route> */}
      </Switch>
    </>
  );
};

export default Company;
