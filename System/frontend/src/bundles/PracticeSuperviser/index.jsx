import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Switch, Route, useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";

import AnnouncementPage from "./AnnouncementPage";
import AgreementPage from "./AgreementPage";
import UsersPage from "./UsersPage";
import NotFound from "@components/NotFound";
import Profile from "../Profile";

import { practiceSuperviserAtom } from "@config/userRecoilAtoms";
import { GET_PRACTICE_SUPERVISER } from "./queries.js";

const PracticeSuperviser = () => {
  const history = useHistory();
  const [practiceSuperviser, setPracticeSuperviser] = useRecoilState(
    practiceSuperviserAtom
  );
  const [getPracticeSuperviser, { data }] = useLazyQuery(
    GET_PRACTICE_SUPERVISER
  );

  useEffect(() => {
    if (!practiceSuperviser) {
      getPracticeSuperviser();
    }
  }, [practiceSuperviser, getPracticeSuperviser]);

  useEffect(() => {
    if (data) {
      if (!data.mePracticeSuperviser) history.push("/logout");
      setPracticeSuperviser(data.mePracticeSuperviser);
    }
  }, [data, setPracticeSuperviser]);

  return (
    <>
      <Switch>
        <Route exact path="/">
          <AnnouncementPage />
        </Route>
        <Route exact path="/users">
          <UsersPage />
        </Route>
        <Route exact path="/agreements">
          <AgreementPage />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
};

export default PracticeSuperviser;
