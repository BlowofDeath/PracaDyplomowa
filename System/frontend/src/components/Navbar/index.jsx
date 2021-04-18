import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useHistory,
} from "react-router-dom";
import { useRecoilState } from "recoil";

import css from "./Navbar.module.css";
import Logo from "@assets/Logo.jsx";
import { ActionMenu, useMenu } from "@components/ActionMenu";
import {
  practiceSuperviserAtom,
  companyAtom,
  studentAtom,
} from "../../config/userRecoilAtoms";

const Navbar = () => {
  const [anchorEl, openMenu, closeMenu] = useMenu();
  const [practiceSuperviser] = useRecoilState(practiceSuperviserAtom);
  const [company] = useRecoilState(companyAtom);
  const [student] = useRecoilState(studentAtom);
  const history = useHistory();

  return (
    <div className={css.container}>
      <div>
        <Link to="/" className={css.logo}>
          <Logo />
        </Link>

        <div className={css.menu}>
          <Link to="/">Ogłoszenia praktyk</Link>
          {practiceSuperviser && (
            <>
              <Link to="/users">Użytkownicy</Link>
              <Link to="/agreements">Umowy</Link>
            </>
          )}
          {student && <Link to="/mypractice">Moja praktyka</Link>}
          {/* <Link to="/agreement">Umowy</Link> */}
        </div>
      </div>
      <div className={css.menu}>
        <a onClick={openMenu} className={css.user}>
          {practiceSuperviser && practiceSuperviser.email}
          {company && company.email}
          {student && student.email}
        </a>
        <ActionMenu ref={anchorEl} closeMenu={closeMenu}>
          {/* <ActionMenu.Item onClick={closeMenu}>Profil</ActionMenu.Item> */}
          <ActionMenu.Item
            onClick={() => {
              closeMenu();
              history.push("/logout");
            }}
          >
            Wyloguj
          </ActionMenu.Item>
        </ActionMenu>
      </div>
    </div>
  );
};

export default Navbar;
