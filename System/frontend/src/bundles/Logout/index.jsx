import React from "react";
import { Redirect } from "react-router-dom";
import useAuth from "@hooks/useAuth";
import { useRecoilState } from "recoil";
import { withApollo } from "@apollo/client/react/hoc";

import {
  studentAtom,
  companyAtom,
  practiceSuperviserAtom,
} from "@config/userRecoilAtoms";

const Logout = ({ client }) => {
  const [, setStudent] = useRecoilState(studentAtom);
  const [, setCompany] = useRecoilState(companyAtom);
  const [, setPracticeSuperviser] = useRecoilState(practiceSuperviserAtom);
  setStudent(null);
  setCompany(null);
  setPracticeSuperviser(null);
  localStorage.removeItem("token");
  localStorage.removeItem("userType");
  client.resetStore();
  return <Redirect to="/login" push={true} />;
};

export default withApollo(Logout);
