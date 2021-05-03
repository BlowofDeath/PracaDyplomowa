import React from "react";
import css from "./CompanyAvatar.module.css";
import clsx from "clsx";

const CompanyAvatar = ({ children, color, className }) => {
  return (
    <div
      className={clsx(css.companyAvatar, className)}
      style={{ backgroundColor: color }}
    >
      {children}
    </div>
  );
};

export default CompanyAvatar;
