import React from "react";
import { IconAccept, IconDecline } from "@icons";
import css from "./Agreement.module.css";
import Container from "@components/Container";

const Agreement = () => {
  return (
    <Container className={css.container}>
      <h2>Example z.o.o</h2>
      <div className={css.alignCenter}>
        <span>Zgoda firmy:</span>
        <IconAccept />
      </div>

      <div className={css.alignCenter}>
        <span>Zgoda opiekuna praktyk:</span>
        <IconDecline />
      </div>
      <span>Okres wykonywania praktyki: Od 12/06/2020 do 10/08/2021</span>
      <span>Liczba godzin: 180</span>
      <span>Email kontaktowy: example@gmail.com</span>
      <h3>Praktyki na stanowisku frontend developer</h3>
      <p>
        Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui
        esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit
        aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute
        id deserunt nisi.
      </p>
      <button>Dziennik</button>
    </Container>
  );
};

export default Agreement;
