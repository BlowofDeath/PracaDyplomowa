import React from "react";
import css from "./Navbar.module.css";
import Logo from "@assets/Logo.jsx";

const Navbar = () => {
  return (
    <div className={css.container}>
      <div>
        <Logo />
        <a>Ogłoszenia praktyk</a>
        <a>Umowy</a>
      </div>
      <div>
        <a>example@gmail.com</a>
      </div>
    </div>
  );
};

export default Navbar;
