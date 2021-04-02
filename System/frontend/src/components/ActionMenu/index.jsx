import React, { useState } from "react";
import css from "./ActionMenu.module.css";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export const Item = React.forwardRef(({ onClick, children }, ref) => {
  return <MenuItem onClick={onClick}>{children}</MenuItem>;
});

export const ActionMenu = React.forwardRef(
  ({ children, closeMenu }, anchorEl) => {
    return (
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {children}
      </Menu>
    );
  }
);

export const useMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return [anchorEl, openMenu, closeMenu];
};

ActionMenu.Item = Item;
