import React from "react";
import css from "./Page.module.css";

const Page = ({ title, children }) => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>{title}</h1>
      <div className={css.content}>{children}</div>
    </div>
  );
};

export default Page;
