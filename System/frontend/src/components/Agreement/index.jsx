import React, { useState } from "react";
import dayjs from "dayjs";
import Avatar from "@material-ui/core/Avatar";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import clsx from "clsx";

import css from "./Agreement.module.css";
import Container from "@components/Container";
import CompanyAvatar from "@components/CompanyAvatar";
import ConfirmModal from "@components/ConfirmModal";
import {
  CONFIRM_PRACTICE_AGREEMENT,
  DELETE_PRACTICE_AGREEMENT,
  CHANGE_DOCUMENT_STATUS,
} from "./queries";
import useAuth from "@hooks/useAuth";
import { IconAccept, IconDecline } from "@icons";
import LoadingSpinner from "@components/LoadingSpinner";
import Textarea from "@components/Textarea";
import { API_URL } from "@config/global";

const STATUS = {
  accepted: { value: "accepted", label: "Zatwierdzono", icon: <IconAccept /> },
  rejected: { value: "rejected", label: "Odrzucono", icon: <IconDecline /> },
};

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
  DocumentFiles,
  refetch,
  company_accepted,
  Company,
  className,
}) => {
  const [confirmPracticeAgreement] = useMutation(CONFIRM_PRACTICE_AGREEMENT);
  const [deletePracticeAgreement] = useMutation(DELETE_PRACTICE_AGREEMENT);
  const [changeDocumentStatus] = useMutation(CHANGE_DOCUMENT_STATUS);
  const { token } = useAuth();

  const [rejectNote, setRejectNote] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openConfirmAgreementModal, setOpenConfirmAgreementModal] = useState(
    false
  );
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const InternshipJournal = DocumentFiles.find(
    (document) => document.type === "journal"
  );
  const PracticeAgreement = DocumentFiles.find(
    (document) => document.type === "agreement"
  );
  const PersonalDataAgreement = DocumentFiles.find(
    (document) => document.type === "personalData"
  );

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

  const handleDocumentStatusChange = (status, rejectNote) => {
    setIsLoading(true);
    changeDocumentStatus({
      variables: {
        id: InternshipJournal.id,
        status: status ? STATUS.accepted.value : STATUS.rejected.value,
        rejectNote: rejectNote,
      },
    })
      .then((data) => {
        if (data) {
          openConfirmModal && setOpenConfirmModal(false);
          openRejectModal && setOpenRejectModal(false);

          refetch();
        }
        setIsLoading(false);
      })
      .catch((err) => {
        enqueueSnackbar("Wystąpił problem", { variant: "error" });
        setIsLoading(false);
        openConfirmModal && setOpenConfirmModal(false);
        openRejectModal && setOpenRejectModal(false);
      });
  };

  return (
    <>
      {isLoading && <LoadingSpinner global />}
      <Container className={css.container}>
        <div className={css.block}>
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
            {dayjs(from).format("DD/MM/YYYY")} do{" "}
            {dayjs(to).format("DD/MM/YYYY")}
          </span>
          <span>
            <span>Numer indeksu: </span> {Student.index_number}
          </span>
          <span>
            <span>Email:</span> {Student.email}
          </span>
          {Company && (
            <span>
              <span>Zgoda firmy: </span>
              {company_accepted ? (
                <IconAccept />
              ) : company_accepted === false ? (
                <IconDecline />
              ) : (
                "Brak"
              )}
            </span>
          )}
          <span>
            <span>Status dziennika: </span>
            {STATUS[InternshipJournal?.status]?.icon ?? "Brak"}
          </span>

          <div className={css.buttons}>
            {!accepted && (
              <button
                onClick={() => {
                  if (!PracticeAgreement || !PersonalDataAgreement) {
                    enqueueSnackbar(
                      "Nie możesz zatwierdzić umowy, brak dokumentów.",
                      { variant: "warning" }
                    );
                  } else if (Company && !company_accepted) {
                    enqueueSnackbar(
                      "Umowa musi być najpierw zatwierdzona przez firmę.",
                      { variant: "warning" }
                    );
                  } else setOpenConfirmAgreementModal(true);
                }}
              >
                Zatwierdź
              </button>
            )}
            <button preset="red" onClick={() => setOpenDeleteModal(true)}>
              Usuń
            </button>

            {InternshipJournal && (
              <>
                <button
                  preset="bright"
                  onClick={() => {
                    setIsLoading(true);
                    return fetch(`${API_URL}/uploads/${InternshipJournal.id}`, {
                      headers: new Headers({
                        Authorization: token,
                      }),
                    })
                      .then((response) => response.blob())
                      .then((blob) => {
                        const url = window.URL.createObjectURL(blob);
                        window.open(url);
                        setIsLoading(false);
                      })
                      .catch((error) => {
                        console.error(error);
                        setIsLoading(false);
                      });
                  }}
                >
                  Dziennik
                </button>

                {InternshipJournal && (
                  <>
                    <button onClick={() => setOpenConfirmModal(true)}>
                      Zatwierdź dziennik
                    </button>

                    <button
                      preset="bright"
                      onClick={() => setOpenRejectModal(true)}
                    >
                      Odrzuć dziennik
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <div className={css.block}>
          <h3>Dane firmy</h3>
          {Company && (
            <CompanyAvatar color={Company.color} className={css.companyAvatar}>
              {Company.name.charAt(0)}-{Company.first_name.charAt(0)}
              {Company.last_name.charAt(0)}
            </CompanyAvatar>
          )}
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
        </div>
        <div className={css.block}>
          <h3>Dokumenty</h3>
          <div className={css.agreements}>
            {PracticeAgreement && (
              <button
                onClick={() => {
                  setIsLoading(true);
                  return fetch(`${API_URL}/uploads/${PracticeAgreement.id}`, {
                    headers: new Headers({
                      Authorization: token,
                    }),
                  })
                    .then((response) => response.blob())
                    .then((blob) => {
                      const url = window.URL.createObjectURL(blob);
                      window.open(url);
                      setIsLoading(false);
                    })
                    .catch((error) => {
                      console.error(error);
                      setIsLoading(false);
                    });
                }}
              >
                Umowa o praktyki
              </button>
            )}
            {PersonalDataAgreement && (
              <button
                onClick={() => {
                  setIsLoading(true);
                  return fetch(
                    `${API_URL}/uploads/${PersonalDataAgreement.id}`,
                    {
                      headers: new Headers({
                        Authorization: token,
                      }),
                    }
                  )
                    .then((response) => response.blob())
                    .then((blob) => {
                      const url = window.URL.createObjectURL(blob);
                      window.open(url);
                      setIsLoading(false);
                    })
                    .catch((error) => {
                      console.error(error);
                      setIsLoading(false);
                    });
                }}
              >
                Umowa o danych osobowych
              </button>
            )}
          </div>
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
      {openConfirmAgreementModal && (
        <ConfirmModal
          open={openConfirmAgreementModal}
          setOpenModal={setOpenConfirmAgreementModal}
          onDecline={() => setOpenConfirmAgreementModal(false)}
          onConfirm={handleConfirm}
        >
          Czy na pewno chcesz zatwierdzić tę umowę?
          <br />
          Tej operacji nie da się cofnąć.
        </ConfirmModal>
      )}
      {openConfirmModal && (
        <ConfirmModal
          open={openConfirmModal}
          setOpenModal={setOpenConfirmModal}
          onDecline={() => setOpenConfirmModal(false)}
          onConfirm={() => handleDocumentStatusChange(true)}
        >
          Czy na pewno chcesz zatwierdzić dziennik?
          <br />
          Tej operacji nie da się cofnąć.
        </ConfirmModal>
      )}
      {openRejectModal && (
        <ConfirmModal
          open={openRejectModal}
          setOpenModal={setOpenConfirmModal}
          onDecline={() => setOpenRejectModal(false)}
          onConfirm={() => handleDocumentStatusChange(false, rejectNote)}
          component
        >
          <Textarea
            label="Podaj powód odrzucenia"
            name="description"
            onChange={(e) => setRejectNote(e.target.value)}
            labelOnTop
          />
        </ConfirmModal>
      )}
    </>
  );
};

export default Agreement;
