import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import Tabs from "@components/Tabs";
import useAuth from "@hooks/useAuth";
import USER_TYPES from "@config/userTypes";
import Page from "@components/Page";
import Students from "./Students";
// import Companies from "./Companies"
import css from "./UsersPage.module.css";

const UsersPage = () => {
  const { userType } = useAuth();

  //   const { loading, error, data } = useQuery(ANNOUNCEMENTS);
  const [tabValue, setTabValue] = useState(0);

  //   if (loading) return <LoadingSpinner />;
  //   if (error) return "error";
  if (userType !== USER_TYPES.practiceSuperviser) return <Redirect to="/" />;
  return (
    <>
      <Page title="Użytkownicy" button={<button>Dodaj użytkownika</button>}>
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
        </div>
        {tabValue === 0 && <Students />}
        {/* {tabValue === 1 && <Companies />} */}
      </Page>
    </>
  );
};

export default UsersPage;
