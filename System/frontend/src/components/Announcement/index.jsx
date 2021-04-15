import React, { useState } from "react";
import dayjs from "dayjs";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import { useRecoilState } from "recoil";

import css from "./Announcement.module.css";
import Container from "@components/Container";
import useAuth from "@hooks/useAuth";
import USER_TYPES from "@config/userTypes";
import ConfirmModal from "@components/ConfirmModal";
import EditAnnouncementModal from "@components/EditAnnouncementModal";
import {
  DELETE_PRACTICE_ANNOUNCEMENT,
  CONFIRM_PRACTICE_ANNOUNCEMENT,
} from "./queries";
import { companyAtom } from "@config/userRecoilAtoms";

const Announcement = ({
  id,
  header,
  slots,
  from,
  to,
  technologies,
  description,
  accepted,
  email,
  phone,
  company_name,
  CompanyId,
  announcements,
  setAnnouncements,
  refetch,
}) => {
  const { userType } = useAuth();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [company] = useRecoilState(companyAtom);
  const [confirmPracticeAnnouncement] = useMutation(
    CONFIRM_PRACTICE_ANNOUNCEMENT
  );
  const [deletePracticeAnnouncement] = useMutation(
    DELETE_PRACTICE_ANNOUNCEMENT
  );

  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    const deleted = await deletePracticeAnnouncement({ variables: { id } });
    if (deleted) {
      enqueueSnackbar("Usunięto pomyślnie", { variant: "success" });
      setOpenDeleteModal(false);
      setAnnouncements(
        announcements.filter((announcement) => announcement.id !== id)
      );
    } else {
      enqueueSnackbar("Wystąpił problem", { variant: "error" });
    }
  };

  const handleConfirm = () => {
    confirmPracticeAnnouncement({ variables: { id } }).then((data) => {
      if (data) {
        enqueueSnackbar("Zatwierdzono pomyślnie", { variant: "success" });
        setAnnouncements(
          announcements.map((announcement) => {
            if (announcement.id === id)
              return { ...announcement, accepted: true };
            else return announcement;
          })
        );
      }
    });
  };

  return (
    <Container className={css.container}>
      <h2>{header}</h2>
      <span>
        <span>Nazwa firmy: </span>
        {company_name}
      </span>

      <span>
        <span>Miejsca:</span> {slots}
      </span>
      <span>
        <span>Od:</span> {dayjs(from).format("DD/MM/YYYY")} <span>do: </span>
        {dayjs(to).format("DD/MM/YYYY")}
      </span>
      {email && (
        <span>
          <span>Email:</span> {email}
        </span>
      )}
      {phone && (
        <span>
          <span>Telefon:</span> {phone}
        </span>
      )}
      <span>
        <span>Technologie:</span> {technologies}
      </span>
      {CompanyId &&
        CompanyId === company?.id &&
        userType === USER_TYPES.company && (
          <span>
            <span>Zatwierdzone:</span> {accepted ? "Tak" : "Nie"}
          </span>
        )}
      <p>{description}</p>
      <div className={css.buttons}>
        {/* {userType === USER_TYPES.student && <button>Złóż podanie</button>} */}
        {userType === USER_TYPES.practiceSuperviser && accepted === false && (
          <button onClick={handleConfirm}>Zatwierdź</button>
        )}
        {((userType === USER_TYPES.company &&
          CompanyId &&
          CompanyId === company?.id) ||
          userType === USER_TYPES.practiceSuperviser) && (
          <button onClick={() => setOpenEditModal(true)}>Edytuj</button>
        )}
        {(userType === USER_TYPES.practiceSuperviser ||
          (CompanyId &&
            CompanyId === company?.id &&
            userType === USER_TYPES.company)) && (
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
          onConfirm={handleDelete}
        >
          Czy na pewno chcesz usunąć te ogłoszenie?
          <br />
          Tej operacji nie da się cofnąć.
        </ConfirmModal>
      )}
      {openEditModal && (
        <EditAnnouncementModal
          open={openEditModal}
          setOpenModal={setOpenEditModal}
          announcement={{
            id,
            header,
            slots,
            from,
            to,
            technologies,
            description,
            accepted,
            email,
            phone,
            company_name,
            CompanyId,
          }}
          refetch={refetch}
        />
      )}
    </Container>
  );
};

export default Announcement;
