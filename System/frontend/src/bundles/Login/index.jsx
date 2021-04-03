import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, gql } from "@apollo/client";
import { Redirect, useHistory } from "react-router-dom";

import css from "./Login.module.css";
import Input from "@components/Input";
import Select from "@components/Select";
import Logo from "@assets/Logo";
import { LOGIN_STUDENT, LOGIN_PRACTICE_SUPERVISER } from "./queries.js";
import useAuth from "@hooks/useAuth";
import useSnackGraphql from "@hooks/useSnackGraphql";
import USER_TYPES from "@config/userTypes";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { token, setToken, userType, setUserType } = useAuth();
  const [showGraphqlErrors] = useSnackGraphql();
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
              console.log(loginStudent);
              await setToken(loginStudent.token);
              await setUserType(USER_TYPES.student);
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
              console.log(loginPracticeSuperviser.token);
              await setToken(loginPracticeSuperviser.token);
              await setUserType(USER_TYPES.practiceSuperviser);
            }
          })
          .catch(showGraphqlErrors);
        break;
      case USER_TYPES.company:
        console.log("firma");
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
            <Input name="email" label="Email:" bright inputRef={register} />
            <Input
              name="password"
              label="Hasło:"
              type="password"
              bright
              inputRef={register}
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
