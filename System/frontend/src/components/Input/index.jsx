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
  labelOnTop,
  bright,
  placeholder,
  defaultValue,
}) => {
  return (
    <div
      className={clsx(css.container, className, labelOnTop && css.labelOnTop)}
    >
      {label && <label className={clsx(bright && css.bright)}>{label}</label>}
      <input
        placeholder={placeholder}
        type={type}
        id={id}
        name={name}
        onChange={onChange}
        ref={inputRef}
        value={value}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default Input;
