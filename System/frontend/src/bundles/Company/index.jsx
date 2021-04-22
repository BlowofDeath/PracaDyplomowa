import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useLazyQuery } from "@apollo/client";

import css from "./Company.module.css";
import AnnouncementPage from "./AnnouncementPage";
import { companyAtom } from "@config/userRecoilAtoms";
import { GET_COMPANY } from "./queries.js";

const Company = () => {
  const [company, setCompany] = useRecoilState(companyAtom);
  const [getCompany, { data }] = useLazyQuery(GET_COMPANY);
  const history = useHistory();

  useEffect(() => {
    if (!company) {
      getCompany();
    }
  }, [company, getCompany]);

  useEffect(() => {
    if (data) {
      if (!data.meCompany) history.push("/logout");
      setCompany(data.meCompany);
    }
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
