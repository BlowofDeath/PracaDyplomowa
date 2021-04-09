import React from "react";

import css from "./Student.module.css";
import Container from "@components/Container";
import CompanyAvatar from "@components/CompanyAvatar";

const Student = ({
  id,
  name,
  city,
  adress,
  email,
  first_name,
  last_name,
  color,
}) => {
  return (
    <Container className={css.container}>
      <div className={css.avatar}>
        <CompanyAvatar color={color}>
          {name.charAt(0)}-{first_name.charAt(0)}
          {last_name.charAt(0)}
        </CompanyAvatar>
        <h3>{name}</h3>
      </div>
      <span>Przedstawiciel: {`${first_name} ${last_name}`}</span>
      <span>Email: {email}</span>
      <span>Miasto: {city}</span>
      <span>Adres: {adress}</span>
    </Container>
  );
};

export default Student;
