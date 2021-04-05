import React from "react";
import css from "./ConfirmModal.module.css";
import Modal from "@components/Modal";

const ConfirmModal = (props) => {
  const { children, onConfirm, onDecline } = props;
  return (
    <Modal
      {...props}
      buttons={
        <>
          <button preset="bright" onClick={onDecline}>
            Nie
          </button>
          <button onClick={onConfirm}>Tak</button>
        </>
      }
    >
      <p>{children}</p>
    </Modal>
  );
};

export default ConfirmModal;
