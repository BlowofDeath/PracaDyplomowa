import React, { useState } from "react";
import dayjs from "dayjs";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";

import Container from "@components/Container";
import css from "./Practice.module.css";
import { IconAccept, IconDecline } from "@icons";
import FileUploadWrapper from "@components/FileUploadWrapper";
import { CREATE_DOCUMENT } from "./queries.js";
import LoadingSpinner from "@components/LoadingSpinner";

const DOCUMENT_TYPE = {
  journal: "journal",
  agreement: "agreement",
  personalData: "personalData",
};

const Practice = ({
  id,
  company_name,
  address,
  city,
  phone,
  email,
  from,
  to,
  accepted,
  dictionaryUrl,
  DocumentFiles,
}) => {
  const history = useHistory();
  const [filePracticeAgreement, setFilePracticeAgreement] = useState();
  const [filePersonalDataAgreement, setFilePersonalDataAgreement] = useState();
  const [isLoading, setIsLoading] = useState();
  const [createDocument] = useMutation(CREATE_DOCUMENT);

  const PracticeAgreement = DocumentFiles.find(
    (document) => document.type === DOCUMENT_TYPE.agreement
  );
  const PersonalDataAgreement = DocumentFiles.find(
    (document) => document.type === DOCUMENT_TYPE.personalData
  );

  const handleCreateDocument = (file, type) => {
    setIsLoading(true);
    createDocument({
      variables: {
        PracticeAgreementId: id,
        file,
        type,
      },
    })
      .then((data) => {
        if (data) console.log(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading && <LoadingSpinner global />}
      <Container className={css.container}>
        <div className={css.block}>
          <h2>{company_name}</h2>
          <span>
            <span>Email:</span> {email}
          </span>
          <span>
            <span>Telefon:</span> {phone}
          </span>
          <span>
            <span>Miejscowość:</span> {city}
          </span>
          <span>
            <span>Adres:</span> {address}
          </span>
          <br />
          <span>
            <span>Okres wykonywania praktyki:</span> od{" "}
            {dayjs(from).format("DD/MM/YYYY")} do{" "}
            {dayjs(to).format("DD/MM/YYYY")}
          </span>
          <span>
            <span>Zgoda opiekuna praktyk: </span>
            {accepted ? <IconAccept /> : <IconDecline />}
          </span>
          <div className={css.marginTop}>
            {accepted && (
              <button onClick={() => history.push(`${dictionaryUrl}/${id}`)}>
                Dziennik
              </button>
            )}
          </div>
        </div>
        <div className={css.block}>
          <h3>Dokumenty</h3>
          <span>
            <span>Umowa o praktykę</span>
          </span>
          <div className={css.buttons}>
            {accepted && (
              <button
                onClick={() =>
                  console.log("PracticeAgreement", PracticeAgreement)
                }
                disabled={!PracticeAgreement}
              >
                Umowa o praktykę
              </button>
            )}
            <div className={css.fileHandler}>
              <FileUploadWrapper
                onFileSelect={(file) => setFilePracticeAgreement(file)}
              >
                <button>Przeglądaj</button>
              </FileUploadWrapper>
              <span>{filePracticeAgreement?.name}</span>
            </div>
          </div>
          {filePracticeAgreement && (
            <button
              onClick={() =>
                handleCreateDocument(
                  filePracticeAgreement,
                  DOCUMENT_TYPE.agreement
                )
              }
              className={css.send}
            >
              Wyślij
            </button>
          )}
          <span>
            <span>Umowa powierzenia przetwarzania danych osobowych</span>
          </span>
          <div className={css.buttons}>
            {accepted && (
              <button
                onClick={() =>
                  console.log("PersonalDataAgreement", PersonalDataAgreement)
                }
                disabled={!PersonalDataAgreement}
              >
                Umowa przetwarzania danych
              </button>
            )}
            <div className={css.fileHandler}>
              <FileUploadWrapper
                onFileSelect={(file) => setFilePersonalDataAgreement(file)}
              >
                <button>Przeglądaj</button>
              </FileUploadWrapper>
              <span>{filePersonalDataAgreement?.name}</span>
            </div>
          </div>
          {filePersonalDataAgreement && (
            <button
              onClick={() =>
                handleCreateDocument(
                  filePersonalDataAgreement,
                  DOCUMENT_TYPE.personalData
                )
              }
              className={css.send}
            >
              Wyślij
            </button>
          )}
        </div>
      </Container>
    </>
  );
};

export default Practice;
