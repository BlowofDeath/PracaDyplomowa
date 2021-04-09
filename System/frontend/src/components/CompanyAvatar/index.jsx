import React from "react";
import css from "./CompanyAvatar.module.css";

const CompanyAvatar = ({ children, color }) => {
  return (
    <div className={css.companyAvatar} style={{ backgroundColor: color }}>
      {children}
    </div>
  );
};

export default CompanyAvatar;
