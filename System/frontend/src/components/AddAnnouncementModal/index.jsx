import React from "react";
import css from "./AddAnnouncementModal.module.css";
import Input from "@components/Input";
import Textarea from "@components/Textarea";
import Modal from "@components/Modal";

const AddAnnouncementModal = (props) => {
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
          <button>Dodaj ogłoszenie</button>
        </>
      }
    >
      <div className={css.container}>
        <div className={css.content}>
          <div className={css.inputGroup}>
            <Input
              label="Tytuł ogłoszenia"
              className={css.firmName}
              labelOnTop
            />
            <Input label="Nazwa firmy" labelOnTop />
            <Input label="Miejsca" type="number" labelOnTop />
            <Input label="Technologie" labelOnTop />
          </div>
        </div>
        <div>
          <div>
            <Textarea label="Opis" labelOnTop />
          </div>
          <div className={css.fromToWrapper}>
            <label>Przedział czasowy</label>
            <Input type="date" label="Od" />
            <Input type="date" label="Do" />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddAnnouncementModal;
