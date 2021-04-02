import React from "react";
import css from "./Container.module.css";
import clsx from "clsx";

const Container = ({ children, className }) => {
  return <div className={clsx(css.container, className)}>{children}</div>;
};

export default Container;
