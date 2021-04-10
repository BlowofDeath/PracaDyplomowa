import React from "react";
import { useQuery } from "@apollo/client";

import Company from "@components/Company";
import css from "./Companies.module.css";
import { GET_COMPANIES } from "./queries";
import LoadingSpinner from "@components/LoadingSpinner";

const Companies = () => {
  const { loading, error, data } = useQuery(GET_COMPANIES);

  if (loading) return <LoadingSpinner />;
  if (error) return "error";
  return (
    <div className={css.companiesList}>
      {data.companies.map(
        ({ id, name, city, address, email, first_name, last_name, color }) => (
          <Company
            key={id}
            first_name={first_name}
            last_name={last_name}
            email={email}
            address={address}
            city={city}
            name={name}
            color={color}
          />
        )
      )}
    </div>
  );
};

export default Companies;
