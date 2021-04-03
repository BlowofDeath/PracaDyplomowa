import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import React from "react";
import useAuth from "@hooks/useAuth";

const clearUserData = (location, removeToken, removeUserType) => {
  removeToken();
  removeUserType();
  return (
    <Redirect
      to={{
        pathname: "/login",
        state: { from: location },
      }}
    />
  );
};

const ProtectedRoute = ({ children, ...rest }) => {
  const { userType, removeToken, removeUserType } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        userType
          ? children
          : clearUserData(location, removeToken, removeUserType)
      }
    />
  );
};

export default ProtectedRoute;
