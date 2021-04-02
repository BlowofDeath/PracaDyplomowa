import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

import css from "./Navbar.module.css";
import Logo from "@assets/Logo.jsx";
import { ActionMenu, useMenu } from "@components/ActionMenu";

const Navbar = () => {
  const [anchorEl, openMenu, closeMenu] = useMenu();
  return (
    <div className={css.container}>
      <div>
        <Link to="/" className={css.logo}>
          <Logo />
        </Link>

        <div className={css.menu}>
          <Link to="/">Ogłoszenia praktyk</Link>
          <Link to="/reportpractice">Zgłoś praktykę</Link>
          <Link to="/agreement">Umowy</Link>
        </div>
      </div>
      <div className={css.menu}>
        <a onClick={openMenu} className={css.user}>
          example@gmail.com
        </a>
        <ActionMenu ref={anchorEl} closeMenu={closeMenu}>
          <ActionMenu.Item onClick={closeMenu}>Profil</ActionMenu.Item>
          <ActionMenu.Item onClick={closeMenu}>Wyloguj</ActionMenu.Item>
        </ActionMenu>
      </div>
    </div>
  );
};

export default Navbar;
