import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import Alert from "@material-ui/lab/Alert";
import validator from "validator";
import { useRecoilValue } from "recoil";
import dayjs from "dayjs";

import css from "./EditAnnouncementModal.module.css";
import Input from "@components/Input";
import Textarea from "@components/Textarea";
import Modal from "@components/Modal";
import { EDIT_ANNOUNCEMENT } from "./queries.js";
import useSnackGraphql from "@hooks/useSnackGraphql";
import LoadingSpinner from "@components/LoadingSpinner";
import { companyAtom } from "@config/userRecoilAtoms";

const EditAnnouncementModal = (props) => {
  const { register, errors, handleSubmit } = useForm();
  const [showGraphqlErrors, enqueueSnackbar] = useSnackGraphql();
  const [editAnnouncement] = useMutation(EDIT_ANNOUNCEMENT);
  const [isLoading, setIsLoading] = useState(false);
  const company = useRecoilValue(companyAtom);

  const { setOpenModal, refetch, announcement } = props;
  const fromDate = dayjs(announcement.from).format("YYYY-MM-DD");
  const toDate = dayjs(announcement.to).format("YYYY-MM-DD");

  const onSubmit = (data) => {
    let uniqueData = {};
    uniqueData.id = announcement.id;
    if (data.header !== announcement.header) uniqueData.header = data.header;
    if (data.slots !== announcement.slots)
      uniqueData.slots = parseInt(data.slots);
    if (data.technologies !== announcement.technologies)
      uniqueData.technologies = data.technologies;
    if (data.description !== announcement.description)
      uniqueData.description = data.description;
    if (data.from !== fromDate) uniqueData.from = data.from;
    if (data.to !== toDate) uniqueData.to = data.to;
    if (data.phone !== announcement.phone) uniqueData.phone = data.phone;
    if (data.email !== announcement.email) uniqueData.email = data.email;
    if (data.company_name !== announcement.company_name)
      uniqueData.company_name = data.company_name;

    setIsLoading(true);
    editAnnouncement({
      variables: uniqueData,
    })
      .then(() => {
        setIsLoading(false);
        refetch();
        enqueueSnackbar("Ogłoszenie edytowano pomyślnie", {
          variant: "success",
        });
        setOpenModal(false);
      })
      .catch((err) => {
        console.log(err);
        showGraphqlErrors(err);
        setIsLoading(false);
      });
  };

  return (
    <Modal
      {...props}
      header="Edytuj ogłoszenie"
      isLoading={isLoading}
      buttons={
        <>
          <button preset="bright" onClick={() => setOpenModal(false)}>
            Zamknij
          </button>
          <button onClick={handleSubmit(onSubmit)}>Zapisz ogłoszenie</button>{" "}
        </>
      }
    >
      <div className={css.container}>
        <div className={css.content}>
          <div className={css.inputGroup}>
            <Input
              inputRef={register({ required: true })}
              label="Nagłówek*"
              labelOnTop
              name="header"
              placeholder="Praktyki na stanowisku..."
              defaultValue={announcement.header}
            />

            {company ? (
              <div>
                <label>Nazwa firmy</label>
                <br />
                <span>{company.name}</span>
              </div>
            ) : (
              <Input
                label="Nazwa firmy*"
                labelOnTop
                inputRef={register({ required: true })}
                name="company_name"
                placeholder="Example z.o.o"
                defaultValue={announcement.company_name}
              />
            )}
            <Input
              label="Miejsca*"
              type="number"
              labelOnTop
              inputRef={register({ required: true })}
              name="slots"
              defaultValue={announcement.slots}
            />
            <Input
              label="Technologie*"
              labelOnTop
              inputRef={register({ required: true })}
              name="technologies"
              placeholder="Java, C++, c#"
              defaultValue={announcement.technologies}
            />
            {company ? (
              <div>
                <label>Email</label>
                <br />
                <span>{company.email}</span>
              </div>
            ) : (
              <Input
                label="Email"
                labelOnTop
                inputRef={register({
                  validate: (value) =>
                    value ? validator.isEmail(value) : true,
                })}
                name="email"
                placeholder="jk@example.com"
                defaultValue={announcement.email}
              />
            )}
            {company?.phone ? (
              <div>
                <label>Phone</label>
                <br />
                <span>{company.phone}</span>
              </div>
            ) : (
              <Input
                label="Telefon"
                labelOnTop
                inputRef={register}
                name="phone"
                placeholder="678 890 ..."
                defaultValue={announcement.phone}
              />
            )}
          </div>
        </div>
        <div>
          <div>
            <Textarea
              label="Opis"
              name="description"
              labelOnTop
              inputRef={register}
              defaultValue={announcement.description}
            />
          </div>
          <div className={css.fromToWrapper}>
            <label>Przedział czasowy</label>
            <Input
              type="date"
              label="Od*"
              inputRef={register({ required: true })}
              name="from"
              defaultValue={fromDate}
            />
            <Input
              type="date"
              label="Do*"
              inputRef={register({ required: true })}
              name="to"
              defaultValue={toDate}
            />
          </div>
        </div>
      </div>
      <div className={css.errors}>
        {errors.header && (
          <Alert variant="filled" severity="error">
            Nagłówek jest wymagany
          </Alert>
        )}
        {errors.company_name && (
          <Alert variant="filled" severity="error">
            Nazwa firmy jest wymagana
          </Alert>
        )}
        {errors.slots && (
          <Alert variant="filled" severity="error">
            Miejsca są wymagane
          </Alert>
        )}
        {errors.technologies && (
          <Alert variant="filled" severity="error">
            Technologie są wymagane
          </Alert>
        )}
        {(errors.from || errors.to) && (
          <Alert variant="filled" severity="error">
            Podaj poprawny przedział czasowy
          </Alert>
        )}
        {errors.email && (
          <Alert variant="filled" severity="error">
            Adres email jest niepoprawny
          </Alert>
        )}
      </div>
    </Modal>
  );
};

export default EditAnnouncementModal;
