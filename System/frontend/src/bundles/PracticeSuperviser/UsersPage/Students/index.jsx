import React from "react";
import { useQuery } from "@apollo/client";

import Student from "@components/Student";
import css from "./Students.module.css";
import { GET_STUDENTS } from "./queries";
import LoadingSpinner from "@components/LoadingSpinner";
import searchHelper from "@utility/searchHelper";

const Students = ({ search }) => {
  const { loading, error, data } = useQuery(GET_STUDENTS);

  if (loading) return <LoadingSpinner />;
  if (error) return "error";
  return (
    <div className={css.studentsList}>
      {data.students.map(
        ({ first_name, last_name, email, index_number, color, id }) => {
          if (
            !searchHelper([first_name, last_name, email, index_number], search)
          )
            return null;
          return (
            <Student
              key={id}
              first_name={first_name}
              last_name={last_name}
              email={email}
              index_number={index_number}
              color={color}
            />
          );
        }
      )}
    </div>
  );
};

export default Students;
