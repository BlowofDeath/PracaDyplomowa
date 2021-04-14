import React from "react";
import { useHistory } from "react-router-dom";

import Logo from "@assets/Logo";
import css from "./Statement.module.css";
import LoadingSpinner from "@components/LoadingSpinner";

const Statement = ({ children, title, isLoading }) => {
  const history = useHistory();
  return (
    <div className={css.outerContainer}>
      <div className={css.container}>
        <div className={css.header}>
          <h2>{title}</h2>
          <Logo onClick={() => history.push("/")} />
        </div>
        <div className={css.content}>
          <p>{children}</p>
          {isLoading && <LoadingSpinner />}
        </div>
      </div>
    </div>
  );
};

export default Statement;
