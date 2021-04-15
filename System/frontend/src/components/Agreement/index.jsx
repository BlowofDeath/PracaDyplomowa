import React, { useState } from "react";
import dayjs from "dayjs";
import Avatar from "@material-ui/core/Avatar";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";

import css from "./Agreement.module.css";
import Container from "@components/Container";
import ConfirmModal from "@components/ConfirmModal";
import {
  CONFIRM_PRACTICE_AGREEMENT,
  DELETE_PRACTICE_AGREEMENT,
} from "./queries";

const Agreement = ({
  id,
  company_name,
  city,
  address,
  email,
  phone,
  Student,
  from,
  to,
  color,
  accepted,
  agreements,
  setAgreements,
}) => {
  const [confirmPracticeAgreement] = useMutation(CONFIRM_PRACTICE_AGREEMENT);
  const [deletePracticeAgreement] = useMutation(DELETE_PRACTICE_AGREEMENT);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleConfirm = () => {
    confirmPracticeAgreement({ variables: { id } }).then((data) => {
      if (data) {
        enqueueSnackbar("Zatwierdzono pomyślnie", { variant: "success" });
        setAgreements(
          agreements.map((agreement) => {
            if (agreement.id === id) return { ...agreement, accepted: true };
            else return agreement;
          })
        );
      }
    });
  };

  const handleDelete = async () => {
    const deleted = await deletePracticeAgreement({ variables: { id } });
    if (deleted) {
      enqueueSnackbar("Usunięto pomyślnie", { variant: "success" });
      setOpenDeleteModal(false);
      setAgreements(
        agreements.filter((announcement) => announcement.id !== id)
      );
    } else {
      enqueueSnackbar("Wystąpił problem", { variant: "error" });
    }
  };

  return (
    <>
      <Container className={css.container}>
        <div className={css.avatar}>
          {" "}
          <Avatar style={{ backgroundColor: Student.color }}>
            {Student.first_name.charAt(0)}
            {Student.last_name.charAt(0)}
          </Avatar>
          <h2>{`${Student.first_name} ${Student.last_name}`}</h2>
        </div>

        <span>
          <span>Okres wykonywania praktyki:</span> Od{" "}
          {dayjs(from).format("DD/MM/YYYY")} do {dayjs(to).format("DD/MM/YYYY")}
        </span>
        <span>
          <span>Numer indeksu: </span> {Student.index_number}
        </span>
        <span>
          <span>Email:</span> {Student.email}
        </span>
        <h3>Dane firmy</h3>
        <span>
          <span>Nazwa firmy: </span>
          {company_name}
        </span>
        <span>
          <span>Email: </span>
          {email}
        </span>
        <span>
          <span>Telefon: </span>
          {phone}
        </span>
        <span>
          <span>Miejscowość: </span>
          {city}
        </span>
        <span>
          <span>Adres: </span>
          {address}
        </span>
        <div className={css.buttons}>
          {!accepted && <button onClick={handleConfirm}>Zatwierdź</button>}
          <button preset="red" onClick={() => setOpenDeleteModal(true)}>
            Usuń
          </button>
        </div>
      </Container>
      {openDeleteModal && (
        <ConfirmModal
          open={openDeleteModal}
          setOpenModal={setOpenDeleteModal}
          onDecline={() => setOpenDeleteModal(false)}
          onConfirm={handleDelete}
        >
          Czy na pewno chcesz usunąć tą umowe?
          <br />
          Tej operacji nie da się cofnąć.
        </ConfirmModal>
      )}
    </>
  );
};

export default Agreement;
