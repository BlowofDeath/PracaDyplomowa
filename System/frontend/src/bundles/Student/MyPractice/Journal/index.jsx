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

  useEffect(() => {
    if (agreementId)
      getJournal({ variables: { PracticeAgreementId: agreementId } });
  }, [agreementId]);

  if (loading) return <LoadingSpinner />;
  console.log(data);
  const journalId = data?.getJournal?.id;
  return (
    <div className={css.container}>
      {journalId && (
        <span>
          <span>Zatwierdzone przez opiekuna prakty:</span>
          {data?.getJournal?.accepted ? <IconAccept /> : <IconDecline />}
        </span>
      )}

      <div className={css.wrapper}>
        {journalId && (
          <a href={`/uploads/${journalId}/?token=${token}`}>
            <button preset="bright">Dziennik</button>
          </a>
        )}
        {(!journalId || !data?.getJournal?.accepted) && (
          <div className={css.fileHandler}>
            <FileUploadWrapper onFileSelect={(file) => setFile(file)}>
              <button>Przeglądaj</button>
            </FileUploadWrapper>
            <span>{file?.name}</span>
          </div>
        )}
      </div>

      {(!journalId || !data?.getJournal?.accepted) && (
        <>
          {console.log("file", file)}
          <button
            onClick={() => {
              console.log(file);
              file &&
                createJournal({
                  variables: { file, PracticeAgreementId: agreementId },
                })
                  .then((result) => {
                    if (result) {
                      refetch();
                    }
                  })
                  .catch(enqueueError);
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
