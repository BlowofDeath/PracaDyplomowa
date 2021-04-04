import React from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

import css from "./AddAnnouncementModal.module.css";
import Input from "@components/Input";
import Textarea from "@components/Textarea";
import Modal from "@components/Modal";
import { ADD_ANNOUNCEMENT } from "./queries.js";

const AddAnnouncementModal = (props) => {
  const { register, handleSubmit } = useForm();
  const [addAnnouncement, { loading, error }] = useMutation(ADD_ANNOUNCEMENT);
  const onSubmit = (data) => {
    console.log(data);
    addAnnouncement({
      variables: {
        header: data.header,
        slots: parseInt(data.slots),
        technologies: data.technologies,
        description: data.description,
        from: data.from,
        to: data.to,
      },
    }).then(() => {
      console.log("success!");
    });
  };
  const { setOpenModal } = props;
  return (
    <Modal
      {...props}
      header="Dodaj ogłoszenie"
      buttons={
        <>
          <button preset="bright" onClick={() => setOpenModal(false)}>
            Zamknij
          </button>
          <button onClick={handleSubmit(onSubmit)}>Dodaj ogłoszenie</button>
        </>
      }
    >
      <div className={css.container}>
        <div className={css.content}>
          <div className={css.inputGroup}>
            <Input
              inputRef={register}
              label="Nagłówek"
              className={css.firmName}
              labelOnTop
              name="header"
            />
            <Input
              label="Nazwa firmy"
              labelOnTop
              inputRef={register}
              name="company"
            />
            <Input
              label="Miejsca"
              type="number"
              labelOnTop
              inputRef={register}
              name="slots"
            />
            <Input
              label="Technologie"
              labelOnTop
              inputRef={register}
              name="technologies"
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
            <Input type="date" label="Od" inputRef={register} name="from" />
            <Input type="date" label="Do" inputRef={register} name="to" />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddAnnouncementModal;
