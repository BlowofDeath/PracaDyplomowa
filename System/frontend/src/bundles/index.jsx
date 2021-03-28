import React from "react";
import Login from "@bundles/Login";
import Student from "@bundles/Student";
import "../styles/globals.css";
import useLocalStorage from "@hooks/useLocalStorage";

const Application = () => {
  const [token] = useLocalStorage("token", "f");
  return <>{token ? <Login /> : <Student />}</>;
};

export default Application;
