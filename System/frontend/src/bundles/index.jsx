import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import Login from "@bundles/Login";
import Student from "@bundles/Student";
import "../styles/globals.css";
import useLocalStorage from "@hooks/useLocalStorage";
import PrivateRoute from "../routes/PrivateRoute";
import Layout from "@components/Layout";
import Logout from "./Logout";

const Application = () => {
  const [token] = useLocalStorage("token");
  const [userType] = useLocalStorage("userType");

  return (
    <BrowserRouter>
      <Switch>
        <Login path="/login" />
        <Route path="/logout">
          <Logout />
        </Route>

        <PrivateRoute path="/" userTypeExpected="student">
          <Layout>
            <Student />
          </Layout>
        </PrivateRoute>

        <PrivateRoute path="/" userTypeExpected="practice-superviser">
          <Layout>"practice-superviser"</Layout>
        </PrivateRoute>

        <PrivateRoute path="/" userTypeExpected="company">
          <Layout>"company"</Layout>
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
};

export default Application;
