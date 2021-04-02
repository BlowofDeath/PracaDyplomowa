import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import React from "react";
import useLocalStorage from "@hooks/useLocalStorage";

const clearUserData = (location) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return (
    <Redirect
      to={{
        pathname: "/login",
        state: { from: location },
      }}
    />
  );
};

const PrivateRoute = ({ children, userTypeExpected, ...rest }) => {
  const [userType] = useLocalStorage("userType");
  console.log("user", userTypeExpected);
  console.log("userType", userType);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        userType ? (
          userType === userTypeExpected ? (
            children
          ) : (
            clearUserData(location)
          )
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
