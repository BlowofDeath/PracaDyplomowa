import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useRecoilState } from "recoil";

import Tabs from "@components/Tabs";
import useAuth from "@hooks/useAuth";
import USER_TYPES from "@config/userTypes";
import Page from "@components/Page";
import Students from "./Students";
import Companies from "./Companies";
import css from "./UsersPage.module.css";
import AddUserModal from "@components/AddUserModal";
import SearchInput from "@components/SearchInput";
import { globalDatePickerValueAtom } from "@config/userRecoilAtoms";
import YearPicker from "@components/YearPicker";

const UsersPage = () => {
  const { userType } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [yearFilter, setYearFilter] = useRecoilState(globalDatePickerValueAtom);

  if (userType !== USER_TYPES.practiceSuperviser) return <Redirect to="/" />;
  return (
    <>
      <Page
        title="Użytkownicy"
        button={
          <button onClick={() => setOpenModal(true)}>Dodaj użytkownika</button>
        }
      >
        <div className={css.tabs}>
          <Tabs
            value={tabValue}
            indicatorColor="primary"
            textColor="primary"
            onChange={(event, newValue) => setTabValue(newValue)}
          >
            <Tabs.Tab label="Studenci" />
            <Tabs.Tab label="Firmy" />
          </Tabs>
          <div>
            <YearPicker
              className={css.yearPicker}
              onChange={setYearFilter}
              year={yearFilter}
            />
            <SearchInput
              className={css.searchInput}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>
        {tabValue === 0 && <Students search={search} yearFilter={yearFilter} />}
        {tabValue === 1 && (
          <Companies search={search} yearFilter={yearFilter} />
        )}
      </Page>
      {openModal && (
        <AddUserModal open={openModal} setOpenModal={setOpenModal} />
      )}
    </>
  );
};

export default UsersPage;
