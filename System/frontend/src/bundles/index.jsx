import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import Login from "@bundles/Login";
import Student from "@bundles/Student";
import "../styles/globals.css";
import useLocalStorage from "@hooks/useLocalStorage";
import PrivateRoute from "../routes/PrivateRoute";
import ProtectedRoute from "../routes/ProtectedRoute";
import PracticeSuperviser from "./PracticeSuperviser";
import Company from "./Company";
import Layout from "@components/Layout";
import Logout from "./Logout";
import USER_TYPES from "@config/userTypes";

const Application = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>

        <Route path="/logout">
          <Logout />
        </Route>

        <ProtectedRoute path="/">
          <Layout>
            <PrivateRoute userType={USER_TYPES.student}>
              <Student />
            </PrivateRoute>
            <PrivateRoute userType={USER_TYPES.practiceSuperviser}>
              <PracticeSuperviser />
            </PrivateRoute>
            <PrivateRoute userType={USER_TYPES.company}>
              <Company />
            </PrivateRoute>
          </Layout>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
};

export default Application;
