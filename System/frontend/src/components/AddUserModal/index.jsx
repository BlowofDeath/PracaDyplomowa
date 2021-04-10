import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import Alert from "@material-ui/lab/Alert";
import validator from "validator";

import css from "./AddUserModal.module.css";
import Input from "@components/Input";
import Textarea from "@components/Textarea";
import Modal from "@components/Modal";
// import { ADD_STUDENT } from "./queries.js";
import useSnackGraphql from "@hooks/useSnackGraphql";
import LoadingSpinner from "@components/LoadingSpinner";
import Select from "@components/Select";
import { CREATE_INVITE } from "./queries";
import USER_TYPES from "@config/userTypes";

const AddAnnouncementModal = (props) => {
  const { register, errors, handleSubmit } = useForm();
  const [showGraphqlErrors, enqueueSnackbar] = useSnackGraphql();
  const [createInvite] = useMutation(CREATE_INVITE);
  const [isLoading, setIsLoading] = useState(false);

  const { setOpenModal } = props;

  const onSubmit = (data) => {
    setIsLoading(true);
    createInvite({
      variables: {
        email: data.email,
        userType: data.userType,
      },
    })
      .then((data) => {
        if (data)
          enqueueSnackbar("Zaproszenie wysłano pomyślnie", {
            variant: "success",
          });
        setIsLoading(false);
        setOpenModal(false);
      })
      .catch((err) => {
        showGraphqlErrors(err);
        setIsLoading(false);
      });
  };

  return (
    <Modal
      {...props}
      header="Dodaj użytkownika"
      isLoading={isLoading}
      buttons={
        <>
          <button preset="bright" onClick={() => setOpenModal(false)}>
            Zamknij
          </button>

          <button onClick={handleSubmit(onSubmit)}>Wyślij zaproszenie</button>
        </>
      }
    >
      <div className={css.container}>
        <div className={css.content}>
          <div className={css.inputGroup}>
            <Select
              inputRef={register}
              options={[
                { label: "Student", value: USER_TYPES.student },
                {
                  label: "Opiekun praktyk",
                  value: USER_TYPES.practiceSuperviser,
                },
                { label: "Firma", value: USER_TYPES.company },
              ]}
              label="Typ użytkownika*"
              name="userType"
              labelOnTop
            />
            <Input
              inputRef={register({
                required: true,
                validate: validator.isEmail,
              })}
              label="Adres email*"
              labelOnTop
              name="email"
              placeholder="jk@example.com"
            />
          </div>
        </div>
      </div>
      <div className={css.errors}>
        {errors.email && (
          <Alert variant="filled" severity="error">
            Adres email jest niepoprawny
          </Alert>
        )}
      </div>
    </Modal>
  );
};

export default AddAnnouncementModal;
