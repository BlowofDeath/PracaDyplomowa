import React from "react";
import TextField from "@material-ui/core/TextField";
import css from "./SearchInput.module.css";
import clsx from "clsx";

export const SearchInput = (props) => {
  return (
    <TextField
      {...props}
      variant="outlined"
      className={clsx(css.search, props?.className)}
      label="Szukaj"
    />
  );
};

export default SearchInput;
