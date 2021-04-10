import React from "react";

import Logo from "@assets/Logo";
import css from "./Statement.module.css";
import LoadingSpinner from "@components/LoadingSpinner";

const Statement = ({ children, title, isLoading }) => {
  return (
    <div className={css.outerContainer}>
      <div className={css.container}>
        <div className={css.header}>
          <h2>{title}</h2>
          <Logo />
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
