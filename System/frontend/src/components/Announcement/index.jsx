import React from "react";
import css from "./Announcement.module.css";
import Container from "@components/Container";

const Announcement = () => {
  return (
    <Container>
      <h2>Praktyki na stanowisku frontend developer</h2>
      <span>Nazwa firmy: Example z.o.o</span>
      <span>Miejsca: 2</span>
      <p>
        Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui
        esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit
        aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute
        id deserunt nisi.
      </p>
      <button>Złóż podanie</button>
    </Container>
  );
};

export default Announcement;
