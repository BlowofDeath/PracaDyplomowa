import React, { useEffect } from "react";
import clsx from "clsx";

import css from "./YearPicker.module.css";

const YearPicker = ({ className, onChange, year }) => {
  const now = new Date().getFullYear();
  const years = Array.from(
    new Array(16),
    (val, index) => index - 8 + Number(now)
  );
  return (
    <>
      <select
        className={clsx(css.yearPicker, className)}
        onChange={(e) => onChange && onChange(e.target.value)}
        value={year}
      >
        {years.map((year, index) => {
          return (
            <option key={`year${index}`} value={year}>
              {year}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default YearPicker;
