import React from "react";
import dayjs from "dayjs";

import Container from "@components/Container";
import css from "./Practice.module.css";
import { IconAccept, IconDecline } from "@icons";

const Practice = ({
  company_name,
  address,
  city,
  phone,
  email,
  from,
  to,
  accepted,
}) => {
  return (
    <Container className={css.container}>
      <h2>{company_name}</h2>
      <span>
        <span>Email:</span> {email}
      </span>
      <span>
        <span>Telefon:</span> {phone}
      </span>
      <span>
        <span>Miejscowość:</span> {city}
      </span>
      <span>
        <span>Adres:</span> {address}
      </span>
      <br />
      <span>
        <span>Okres wykonywania praktyki:</span> od{" "}
        {dayjs(from).format("DD/MM/YYYY")} do {dayjs(to).format("DD/MM/YYYY")}
      </span>
      <span>
        <span>Zgoda opiekuna praktyk: </span>
        {accepted ? <IconAccept /> : <IconDecline />}
      </span>
    </Container>
  );
};

export default Practice;
