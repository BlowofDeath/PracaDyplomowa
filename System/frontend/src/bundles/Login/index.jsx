import React from "react";
import css from "./Login.module.css";
import Input from "@components/Input";
import Select from "@components/Select";
import Logo from "@assets/Logo";

const Login = () => {
  return (
    <div className={css.container}>
      <Logo />

      <div className={css.content}>
        <h1 className={css.title}>Zaloguj</h1>
        <div className={css.form}>
          <Input name="email" label="Email:" />
          <Input name="password" label="Hasło:" type="password" />

          <Select
            options={[
              { label: "Student", value: "student" },
              { label: "Opiekun praktyk", value: "practice-superviser" },
              { label: "Firma", value: "company" },
            ]}
            label="Zaloguj jako:"
          />
          <button preset="bright" className={css.logIn}>
            Zaloguj
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
