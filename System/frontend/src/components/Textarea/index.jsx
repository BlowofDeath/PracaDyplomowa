import React from "react";
import css from "./Textarea.module.css";
import clsx from "clsx";

const Textarea = ({
  id,
  name,
  onChange,
  inputRef,
  value,
  placeholder,
  labelOnTop,
  label,
  className,
  bright,
  defaultValue,
}) => {
  return (
    <div
      className={clsx(css.container, className, labelOnTop && css.labelOnTop)}
    >
      {label && <label className={clsx(bright && css.bright)}>{label}</label>}
      <textarea
        id={id}
        name={name}
        onChange={onChange}
        ref={inputRef}
        placeholder={placeholder}
        defaultValue={defaultValue}
      ></textarea>
    </div>
  );
};

export default Textarea;
