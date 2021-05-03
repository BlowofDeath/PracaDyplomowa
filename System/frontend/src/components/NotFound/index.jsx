import React from "react";
import css from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={css.container}>
      <div className={css.content}>
        <h2>Błędny adres url</h2>
        <span>404</span>
      </div>
    </div>
  );
};

export default NotFound;
