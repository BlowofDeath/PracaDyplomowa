import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import css from "./LoadingSpinner.module.css";

const LoadingSpinner = (props) => {
  return <CircularProgress {...props} className={css.spinner} />;
};

export default LoadingSpinner;
