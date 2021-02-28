import React from "react";
import css from "./Select.module.css";
import clsx from "clsx";

const Select = ({
  id,
  name,
  onChange,
  inputRef,
  value,
  label,
  className,
  options,
}) => {
  return (
    <div className={clsx(css.container, className)}>
      {label && <label>{label}</label>}
      <select
        id={id}
        name={name}
        onChange={onChange}
        ref={inputRef}
        value={value}
      >
        {options.map(({ label, value }) => {
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
