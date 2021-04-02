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

  return (
    <BrowserRouter>
      <Switch>
        <Login path="/login" />
        <Layout>
          <PrivateRoute path="/" userTypeExpected="student">
            <Student />
          </PrivateRoute>
        </Layout>
        <Route exact path="/logout">
          <Logout />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Application;
