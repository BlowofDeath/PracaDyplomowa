import React, { useState } from "react";
import dayjs from "dayjs";

import css from "./Announcement.module.css";
import Container from "@components/Container";
import useAuth from "@hooks/useAuth";
import USER_TYPES from "@config/userTypes";
import ConfirmModal from "@components/ConfirmModal";

const Announcement = ({
  header,
  slots,
  from,
  to,
  technologies,
  description,
  accepted,
}) => {
  const { userType } = useAuth();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
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
      <div className={css.buttons}>
        {userType === USER_TYPES.student && <button>Złóż podanie</button>}
        {userType === USER_TYPES.practiceSuperviser && accepted === false && (
          <button>Zatwierdź</button>
        )}
        {userType === USER_TYPES.practiceSuperviser && (
          <button preset="red" onClick={() => setOpenDeleteModal(true)}>
            Usuń
          </button>
        )}
      </div>
      {openDeleteModal && (
        <ConfirmModal
          open={openDeleteModal}
          setOpenModal={setOpenDeleteModal}
          onDecline={() => setOpenDeleteModal(false)}
        >
          Czy na pewno chcesz usunąć te ogłoszenie?
        </ConfirmModal>
      )}
    </Container>
  );
};

export default Announcement;
