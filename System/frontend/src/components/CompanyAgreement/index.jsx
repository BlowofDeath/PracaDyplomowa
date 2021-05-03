import React, { useState } from "react";
import dayjs from "dayjs";
import Avatar from "@material-ui/core/Avatar";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import clsx from "clsx";

import css from "./Agreement.module.css";
import Container from "@components/Container";
import ConfirmModal from "@components/ConfirmModal";
import {
  CONFIRM_PRACTICE_AGREEMENT,
  REJECT_COMPANY_AGREEMENT,
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

const CompanyAgreement = ({
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
  const [rejectCompanyAgreement] = useMutation(REJECT_COMPANY_AGREEMENT);
  const { token } = useAuth();

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
        setOpenConfirmAgreementModal(false);
        refetch();
      }
    });
  };

  const handleReject = () => {
    rejectCompanyAgreement({ variables: { id } }).then((data) => {
      if (data) {
        enqueueSnackbar("Odrzucono pomyślnie", { variant: "success" });
        setAgreements(
          agreements.map((agreement) => {
            if (agreement.id === id) return { ...agreement, accepted: false };
            else return agreement;
          })
        );
        setOpenRejectModal(false);
        refetch();
      }
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
          <div className={css.buttons}>
            {!company_accepted && (
              <button
                onClick={() => {
                  setOpenConfirmAgreementModal(true);
                }}
              >
                Zatwierdź
              </button>
            )}
            {company_accepted === null && (
              <button preset="red" onClick={() => setOpenRejectModal(true)}>
                Odrzuć
              </button>
            )}
          </div>
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
            {InternshipJournal && (
              <button
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
            )}
          </div>
        </div>
      </Container>
      {openRejectModal && (
        <ConfirmModal
          open={openRejectModal}
          setOpenModal={setOpenRejectModal}
          onDecline={() => setOpenRejectModal(false)}
          onConfirm={handleReject}
        >
          Czy na pewno chcesz odrzucić tą umowe?
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
    </>
  );
};

export default CompanyAgreement;
