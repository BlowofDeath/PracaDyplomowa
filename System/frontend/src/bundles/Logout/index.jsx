import React from "react";
import { Redirect } from "react-router-dom";
import useAuth from "@hooks/useAuth";
import { withApollo } from "@apollo/client/react/hoc";

const Logout = ({ client }) => {
  localStorage.removeItem("token");
  localStorage.removeItem("userType");
  client.clearStore();
  return <Redirect to="/login" push={true} />;
};

export default withApollo(Logout);
