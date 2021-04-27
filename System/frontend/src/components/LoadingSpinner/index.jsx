import React from "react";
import ReactDOM from "react-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

import css from "./LoadingSpinner.module.css";
import clsx from "clsx";

const LoadingSpinner = (props) => {
  if (props.global)
    return ReactDOM.createPortal(
      <div className={css.container}>
        <CircularProgress className={clsx(css.spinner, props.className)} />
      </div>,
      document.body
    );
  return <CircularProgress className={clsx(css.spinner, props.className)} />;
};

export default LoadingSpinner;
