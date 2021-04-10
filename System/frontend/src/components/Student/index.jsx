import React from "react";

import css from "./Student.module.css";
import Container from "@components/Container";
import Avatar from "@material-ui/core/Avatar";

const Student = ({ first_name, last_name, index_number, email, color }) => {
  return (
    <Container className={css.container}>
      <div className={css.avatar}>
        <Avatar style={{ backgroundColor: color }}>
          {first_name.charAt(0)}
          {last_name.charAt(0)}
        </Avatar>
        <h3>{`${first_name} ${last_name}`}</h3>
      </div>
      <span>
        <span>Email:</span> {email}
      </span>
      <span>
        <span>Numer indeksu:</span> {index_number}
      </span>
    </Container>
  );
};

export default Student;
