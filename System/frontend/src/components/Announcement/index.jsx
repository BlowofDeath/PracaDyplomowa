import React from "react";
import css from "./Announcement.module.css";
import Container from "@components/Container";
import dayjs from "dayjs";

const Announcement = ({
  header,
  slots,
  from,
  to,
  technologies,
  description,
}) => {
  return (
    <Container className={css.container}>
      <h2>{header}</h2>
      {/* <span>Nazwa firmy: Example z.o.o</span> */}
      <span>Miejsca: {slots}</span>
      <span>
        Od: {dayjs(from).format("DD/MM/YYYY")} do:{" "}
        {dayjs(to).format("DD/MM/YYYY")}
      </span>
      <span>Technologie: {technologies}</span>
      <p>{description}</p>
      <button>Złóż podanie</button>
    </Container>
  );
};

export default Announcement;
