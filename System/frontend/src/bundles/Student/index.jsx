import React from "react";
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

const Student = () => {
  return (
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
  );
};

export default Student;
