import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import Alert from "@material-ui/lab/Alert";

import css from "./AddAnnouncementModal.module.css";
import Input from "@components/Input";
import Textarea from "@components/Textarea";
import Modal from "@components/Modal";
import { ADD_ANNOUNCEMENT } from "./queries.js";
import useSnackGraphql from "@hooks/useSnackGraphql";
import LoadingSpinner from "@components/LoadingSpinner";

const AddAnnouncementModal = (props) => {
  const { register, errors, handleSubmit } = useForm();
  const [showGraphqlErrors] = useSnackGraphql();
  const [addAnnouncement] = useMutation(ADD_ANNOUNCEMENT);
  const [isLoading, setIsLoading] = useState(false);

  const { setOpenModal } = props;

  const onSubmit = (data) => {
    setIsLoading(true);
    console.log(data);
    addAnnouncement({
      variables: {
        header: data.header,
        slots: data.slots ? parseInt(data.slots) : 0,
        technologies: data.technologies,
        description: data.description,
        from: data.from,
        to: data.to,
      },
    })
      .then(() => {
        console.log("success!");
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
      header="Dodaj ogłoszenie"
      isLoading={isLoading}
      buttons={
        <>
          <button preset="bright" onClick={() => setOpenModal(false)}>
            Zamknij
          </button>
          <button onClick={handleSubmit(onSubmit)}>Dodaj ogłoszenie</button>{" "}
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
            />

            <Input
              label="Nazwa firmy*"
              labelOnTop
              inputRef={register({ required: true })}
              name="company"
              placeholder="Example z.o.o"
            />
            <Input
              label="Miejsca*"
              type="number"
              labelOnTop
              inputRef={register({ required: true })}
              name="slots"
              placeholder="1"
            />
            <Input
              label="Technologie*"
              labelOnTop
              inputRef={register({ required: true })}
              name="technologies"
              placeholder="Java, C++, c#"
            />
          </div>
        </div>
        <div>
          <div>
            <Textarea
              label="Opis"
              name="description"
              labelOnTop
              inputRef={register}
            />
          </div>
          <div className={css.fromToWrapper}>
            <label>Przedział czasowy</label>
            <Input
              type="date"
              label="Od*"
              inputRef={register({ required: true })}
              name="from"
            />
            <Input
              type="date"
              label="Do*"
              inputRef={register({ required: true })}
              name="to"
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
        {errors.company && (
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
      </div>
    </Modal>
  );
};

export default AddAnnouncementModal;
