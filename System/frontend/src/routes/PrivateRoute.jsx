import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import React from "react";
import useAuth from "@hooks/useAuth";

const PrivateRoute = ({ children, userType, ...rest }) => {
  const { userType: userTypeStorage } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        userTypeStorage === userType ? children : null
      }
    />
  );
};

export default PrivateRoute;
