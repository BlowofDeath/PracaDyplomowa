import React, { useState, useEffect } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import css from "./Journal.module.css";
import { CREATE_JOURNAL, GET_JOURNAL } from "./queries";
import useAuth from "@hooks/useAuth";
import LoadingSpinner from "@components/LoadingSpinner";
import FileUploadWrapper from "@components/FileUploadWrapper";
import { IconAccept, IconDecline } from "@icons";
import useSnackGraphql from "@hooks/useSnackGraphql";
import { API_URL } from "@config/global";

const Journal = () => {
  const { token } = useAuth();
  const [createJournal] = useMutation(CREATE_JOURNAL);
  const { agreementId } = useParams();
  const [getJournal, { data, loading, refetch }] = useLazyQuery(GET_JOURNAL);
  const [file, setFile] = useState();
  const [enqueueError] = useSnackGraphql();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (agreementId)
      getJournal({ variables: { PracticeAgreementId: agreementId } });
  }, [agreementId]);

  if (loading || isLoading) return <LoadingSpinner />;
  console.log(data);

  const journal = data?.getDocumentFile;
  return (
    <div className={css.container}>
      {journal?.id && (
        <>
          <span>
            <span>Zatwierdzone przez opiekuna praktyk:</span>
            {journal?.status === "accepted" ? (
              <IconAccept />
            ) : journal?.status === "rejected" ? (
              <IconDecline />
            ) : (
              " Brak"
            )}
          </span>
          <br />
          {journal?.rejectNote && (
            <span>
              <span>Powód odrzucenia: </span>
              {journal.rejectNote}
            </span>
          )}
        </>
      )}

      <div className={css.wrapper}>
        {journal?.id && (
          <button
            preset="bright"
            onClick={() =>
              fetch(`${API_URL}/uploads/${journal?.id}`, {
                headers: new Headers({
                  Authorization: token,
                }),
              })
                .then((response) => response.blob())
                .then((blob) => {
                  var link = document.createElement("a");
                  link.href = window.URL.createObjectURL(blob);
                  link.download = "Dziennik praktyk.pdf";
                  link.click();
                  setIsLoading(false);
                })
                .catch((error) => {
                  console.error(error);
                  setIsLoading(false);
                })
            }
          >
            Dziennik
          </button>
        )}
        {(!journal?.id || !data?.getJournal?.status) && (
          <div className={css.fileHandler}>
            <FileUploadWrapper onFileSelect={(file) => setFile(file)}>
              <button>Przeglądaj</button>
            </FileUploadWrapper>
            <span>{file?.name}</span>
          </div>
        )}
      </div>

      {(!journal?.id || !data?.getJournal?.status) && (
        <>
          <button
            onClick={() => {
              setIsLoading(true);
              file &&
                createJournal({
                  variables: { file, PracticeAgreementId: agreementId },
                })
                  .then((result) => {
                    if (result) {
                      refetch();
                    }
                    setIsLoading(false);
                  })
                  .catch((err) => {
                    setIsLoading(false);
                    enqueueError(err);
                  });
            }}
          >
            Wyślij
          </button>
        </>
      )}
    </div>
  );
};

export default Journal;
