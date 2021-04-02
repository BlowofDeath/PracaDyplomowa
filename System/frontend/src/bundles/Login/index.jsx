import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";

import css from "./Login.module.css";
import Input from "@components/Input";
import Select from "@components/Select";
import Logo from "@assets/Logo";
import { LOGIN_STUDENT } from "./queries.js";
import useLocalStorage from "@hooks/useLocalStorage";
import useSnackGraphql from "@hooks/useSnackGraphql";

const USER_TYPES = {
  student: "student",
  practiceSuperviser: "practice-superviser",
  company: "company",
};

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [token, setToken] = useLocalStorage("token");
  const [userType, setUserType] = useLocalStorage("userType");
  const [showGraphqlErrors] = useSnackGraphql();
  const [
    loginStudent,
    { loading: loginStudentLoading, error: loginStudentError },
  ] = useMutation(LOGIN_STUDENT);
  let history = useHistory();

  if (token && userType) history.push("/");

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
              history.push("/");
            }
          })
          .catch(showGraphqlErrors);
        break;
      case USER_TYPES.practiceSuperviser:
        console.log("opiekun praktyk");
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