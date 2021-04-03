import React from "react";
import css from "./Page.module.css";

const Page = ({ title, children, button }) => {
  return (
    <div className={css.container}>
      <div className={css.header}>
        <h1 className={css.title}>{title}</h1>
        {button}
      </div>
      <div className={css.content}>{children}</div>
    </div>
  );
};

export default Page;
