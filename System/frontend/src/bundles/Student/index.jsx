import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { useRecoilState } from "recoil";
import { Switch, Route } from "react-router-dom";

import MyPractice from "./MyPractice";
import AnnouncementPage from "./AnnouncementPage";
import AgreementPage from "./AgreementPage";
import { studentAtom } from "@config/userRecoilAtoms";
import { GET_STUDENT } from "./queries.js";

const Student = () => {
  const [student, setStudent] = useRecoilState(studentAtom);
  const [getStudent, { data }] = useLazyQuery(GET_STUDENT);

  useEffect(() => {
    if (!student) {
      getStudent();
    }
  }, [student, getStudent]);

  useEffect(() => {
    if (data) setStudent(data.meStudent);
  }, [data, setStudent]);

  return (
    <>
      <Switch>
        <Route exact path="/">
          <AnnouncementPage />
        </Route>
        <Route exact path="/mypractice">
          <MyPractice />
        </Route>
        <Route exact path="/agreement">
          <AgreementPage />
        </Route>
      </Switch>
    </>
  );
};

export default Student;
