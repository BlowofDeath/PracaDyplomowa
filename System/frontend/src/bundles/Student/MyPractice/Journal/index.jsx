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
  const journalId = data?.getDocumentFile?.id;
  return (
    <div className={css.container}>
      {journalId && (
        <span>
          <span>Zatwierdzone przez opiekuna praktyk:</span>
          {data?.getJournal?.accepted ? <IconAccept /> : <IconDecline />}
        </span>
      )}

      <div className={css.wrapper}>
        {journalId && (
          <button
            preset="bright"
            onClick={() =>
              fetch(`http://localhost:4001/uploads/${journalId}`, {
                headers: new Headers({
                  Authorization: token,
                }),
              })
                .then((response) => response.blob())
                .then((blob) => {
                  console.log(blob);
                  const url = window.URL.createObjectURL(blob);
                  window.open(url);
                })
                .catch((error) => {
                  console.error(error);
                })
            }
          >
            Dziennik
          </button>
        )}
        {(!journalId || !data?.getJournal?.status) && (
          <div className={css.fileHandler}>
            <FileUploadWrapper onFileSelect={(file) => setFile(file)}>
              <button>Przeglądaj</button>
            </FileUploadWrapper>
            <span>{file?.name}</span>
          </div>
        )}
      </div>

      {(!journalId || !data?.getJournal?.status) && (
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
