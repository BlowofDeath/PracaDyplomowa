import React from "react";
import { Redirect } from "react-router-dom";

const Logout = () => {
  console.log("logout");
  return <Redirect to="/" push={true} />;
};

export default Logout;
