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
  CONFIRM_JOURNAL,
} from "./queries";
import useAuth from "@hooks/useAuth";
import { IconAccept } from "@icons";

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
  InternshipJournal,
  refetch,
}) => {
  const [confirmPracticeAgreement] = useMutation(CONFIRM_PRACTICE_AGREEMENT);
  const [deletePracticeAgreement] = useMutation(DELETE_PRACTICE_AGREEMENT);
  const [confirmJournal] = useMutation(CONFIRM_JOURNAL);
  const { token } = useAuth();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
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
      setAgreements(agreements.filter((agreement) => agreement.id !== id));
    } else {
      enqueueSnackbar("Wystąpił problem", { variant: "error" });
    }
  };

  const handleConfirmJournal = () => {
    confirmJournal({ variables: { id: InternshipJournal.id } }).then((data) => {
      if (data) {
        setOpenConfirmModal(false);
        refetch();
      }
    });
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
        <br />
        {InternshipJournal?.accepted && (
          <span>
            Dziennik zatwierdzony <IconAccept />
          </span>
        )}
        <div className={css.buttons}>
          {!accepted && <button onClick={handleConfirm}>Zatwierdź</button>}
          <button preset="red" onClick={() => setOpenDeleteModal(true)}>
            Usuń
          </button>

          {InternshipJournal && (
            <>
              <a href={`uploads/${InternshipJournal.id}/?token=${token}`}>
                <button preset="bright">Dziennik</button>
              </a>
              {!InternshipJournal.accepted && (
                <button onClick={() => setOpenConfirmModal(true)}>
                  Zatwierdź dziennik
                </button>
              )}
            </>
          )}
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
      {openConfirmModal && (
        <ConfirmModal
          open={openConfirmModal}
          setOpenModal={setOpenConfirmModal}
          onDecline={() => setOpenConfirmModal(false)}
          onConfirm={handleConfirmJournal}
        >
          Czy na pewno chcesz zatwierdzić dziennik?
          <br />
          Tej operacji nie da się cofnąć.
        </ConfirmModal>
      )}
    </>
  );
};

export default Agreement;
