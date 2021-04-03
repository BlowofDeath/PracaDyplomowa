import React from "react";
import { Redirect } from "react-router-dom";
import useAuth from "@hooks/useAuth";

const Logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userType");
  return <Redirect to="/login" push={true} />;
};

export default Logout;
