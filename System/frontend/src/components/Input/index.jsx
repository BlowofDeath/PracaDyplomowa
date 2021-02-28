import React from "react";
import css from "./Input.module.css";
import clsx from "clsx";

const Input = ({
  type,
  id,
  name,
  onChange,
  inputRef,
  value,
  label,
  className,
}) => {
  return (
    <div className={clsx(css.container, className)}>
      {label && <label>{label}</label>}
      <input
        type={type}
        id={id}
        name={name}
        onChange={onChange}
        ref={inputRef}
        value={value}
      />
    </div>
  );
};

export default Input;
