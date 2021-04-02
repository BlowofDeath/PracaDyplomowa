import React from "react";
import { gql, useQuery } from "@apollo/client";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

import ReportPractice from "./ReportPractice";
import AnnouncementPage from "./AnnouncementPage";
import AgreementPage from "./AgreementPage";

const que = gql`
  query test {
    test
  }
`;

const Student = () => {
  const { data } = useQuery(que);
  return (
    <>
      {data && console.log(data)}
      <Switch>
        <Route exact path="/">
          <AnnouncementPage />
        </Route>
        <Route exact path="/reportpractice">
          <ReportPractice />
        </Route>
        <Route exact path="/agreement">
          <AgreementPage />
        </Route>
      </Switch>
    </>
  );
};

export default Student;
