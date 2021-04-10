import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, gql } from "@apollo/client";
import { Redirect, useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import validator from "validator";

import css from "./Login.module.css";
import Input from "@components/Input";
import Select from "@components/Select";
import Logo from "@assets/Logo";
import {
  LOGIN_STUDENT,
  LOGIN_PRACTICE_SUPERVISER,
  LOGIN_COMPANY,
} from "./queries.js";
import useAuth from "@hooks/useAuth";
import useSnackGraphql from "@hooks/useSnackGraphql";
import USER_TYPES from "@config/userTypes";
import {
  studentAtom,
  companyAtom,
  practiceSuperviserAtom,
} from "@config/userRecoilAtoms";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { token, setToken, userType, setUserType } = useAuth();
  const [showGraphqlErrors] = useSnackGraphql();
  const [, setStudent] = useRecoilState(studentAtom);
  const [, setCompany] = useRecoilState(companyAtom);
  const [, setPracticeSupervisor] = useRecoilState(practiceSuperviserAtom);

  const [
    loginStudent,
    { loading: loginStudentLoading, error: loginStudentError },
  ] = useMutation(LOGIN_STUDENT);
  const [
    loginPracticeSuperviser,
    {
      loading: loginPracticeSuperviserLoading,
      error: loginPracticeSuperviserError,
    },
  ] = useMutation(LOGIN_PRACTICE_SUPERVISER);
  const [
    loginCompany,
    { loading: loginCompanyLoading, error: loginCompanyError },
  ] = useMutation(LOGIN_COMPANY);

  if (token && userType) return <Redirect to="/" />;

  const onSubmit = (data) => {
    switch (data.type) {
      case USER_TYPES.student:
        loginStudent({
          variables: { email: data.email, password: data.password },
        })
          .then(async ({ data }) => {
            const { loginStudent } = data;
            if (loginStudent?.token) {
              await setToken(loginStudent.token);
              await setUserType(USER_TYPES.student);
              setStudent(loginStudent.student);
            }
          })
          .catch(showGraphqlErrors);
        break;
      case USER_TYPES.practiceSuperviser:
        loginPracticeSuperviser({
          variables: { email: data.email, password: data.password },
        })
          .then(async ({ data }) => {
            const { loginPracticeSuperviser } = data;
            if (loginPracticeSuperviser?.token) {
              await setToken(loginPracticeSuperviser.token);
              await setUserType(USER_TYPES.practiceSuperviser);
              setPracticeSupervisor(loginPracticeSuperviser.practiceSuperviser);
            }
          })
          .catch(showGraphqlErrors);
        break;
      case USER_TYPES.company:
        loginCompany({
          variables: { email: data.email, password: data.password },
        })
          .then(async ({ data }) => {
            const { loginCompany } = data;
            if (loginCompany?.token) {
              await setToken(loginCompany.token);
              await setUserType(USER_TYPES.company);
              setCompany(loginCompany.company);
            }
          })
          .catch(showGraphqlErrors);
        break;
      default:
        break;
    }
  };
  return (
    <div className={css.page}>
      <div className={css.container}>
        <Logo />

        <div className={css.content}>
          <h1 className={css.title}>Zaloguj</h1>
          <div className={css.form}>
            <Input
              name="email"
              label="Email:"
              bright
              inputRef={register({
                required: true,
                validate: validator.isEmail,
              })}
            />
            <Input
              name="password"
              label="Hasło:"
              type="password"
              bright
              inputRef={register({ required: true, min: 8 })}
            />

            <Select
              inputRef={register}
              options={[
                { label: "Student", value: USER_TYPES.student },
                {
                  label: "Opiekun praktyk",
                  value: USER_TYPES.practiceSuperviser,
                },
                { label: "Firma", value: USER_TYPES.company },
              ]}
              label="Zaloguj jako:"
              name="type"
              bright
            />
            <button
              preset="bright"
              className={css.logIn}
              onClick={handleSubmit(onSubmit)}
            >
              Zaloguj
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
