import React from "react";

import css from "./AfterSend.module.css";
import Container from "@components/Container";
import { IconDecline } from "@icons";

const BeforeSend = () => {
  return (
    <Container className={css.container}>
      <h2>Informacje</h2>
      <span>Ocena: brak oceny</span>
      <span>Komentarz do oceny:</span>
      <p>
        Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
        molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero
        eros et accumsan et iusto odio dignissim qui blandit praesent luptatum
        zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum
        dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
        euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.{" "}
      </p>
      <div className={css.alignCenter}>
        <span>Zatwierdzenie przez opiekuna praktyk:</span>
        <IconDecline />
      </div>

      <h2>Plik dziennika</h2>
      <span className={css.fileName}>dziennik.pdf</span>
    </Container>
  );
};

export default BeforeSend;
