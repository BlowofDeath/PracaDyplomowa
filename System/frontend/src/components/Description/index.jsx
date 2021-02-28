import React from "react";
import css from "./Description.module.css";

const Description = ({ children }) => {
  return <div className={css.container}>{children}</div>;
};

export default Description;
