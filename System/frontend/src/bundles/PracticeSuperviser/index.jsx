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

import AnnouncementPage from "./AnnouncementPage";

const PracticeSuperviser = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <AnnouncementPage />
        </Route>
        {/* <Route exact path="/reportpractice">
          <ReportPractice />
        </Route> */}
        {/* <Route exact path="/agreement">
          <AgreementPage />
        </Route> */}
      </Switch>
    </>
  );
};

export default PracticeSuperviser;
