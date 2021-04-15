import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Switch, Route } from "react-router-dom";
import { useRecoilState } from "recoil";

import AnnouncementPage from "./AnnouncementPage";
import AgreementPage from "./AgreementPage";
import UsersPage from "./UsersPage";
import { practiceSuperviserAtom } from "@config/userRecoilAtoms";
import { GET_PRACTICE_SUPERVISER } from "./queries.js";

const PracticeSuperviser = () => {
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
    if (data) setPracticeSuperviser(data.mePracticeSuperviser);
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
      </Switch>
    </>
  );
};

export default PracticeSuperviser;
