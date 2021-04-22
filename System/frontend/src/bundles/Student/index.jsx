import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { useRecoilState } from "recoil";
import { Switch, Route, useHistory } from "react-router-dom";

import MyPractice from "./MyPractice";
import AnnouncementPage from "./AnnouncementPage";
import { studentAtom } from "@config/userRecoilAtoms";
import { GET_STUDENT } from "./queries.js";

const Student = () => {
  const [student, setStudent] = useRecoilState(studentAtom);
  const [getStudent, { data, loading, error }] = useLazyQuery(GET_STUDENT);
  const history = useHistory();

  useEffect(() => {
    if (!student) {
      getStudent();
    }
  }, [student, getStudent]);

  useEffect(() => {
    if (data) {
      if (!data.meStudent) history.push("/logout");
      setStudent(data.meStudent);
    }
  }, [data, setStudent]);

  return (
    <>
      <Switch>
        <Route exact path="/">
          <AnnouncementPage />
        </Route>
        <Route path="/mypractice">
          <MyPractice />
        </Route>
      </Switch>
    </>
  );
};

export default Student;
