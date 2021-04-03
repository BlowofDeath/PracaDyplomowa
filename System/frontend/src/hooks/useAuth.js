import React, { useState } from "react";

const useAuth = () => {
  const [token, setTokenValue] = useState(localStorage.getItem("token"));
  const [userType, setUserTypeValue] = useState(
    localStorage.getItem("userType")
  );
  const setToken = (value) => {
    localStorage.setItem("token", value);
    setTokenValue(value);
  };

  const setUserType = (value) => {
    localStorage.setItem("userType", value);
    setUserTypeValue(value);
  };

  const removeToken = () => {
    localStorage.removeItem("token");
    setTokenValue(undefined);
  };

  const removeUserType = () => {
    localStorage.removeItem("userType");
    setUserTypeValue(undefined);
  };

  return {
    token,
    setToken,
    userType,
    setUserType,
    removeToken,
    removeUserType,
  };
};

export default useAuth;
