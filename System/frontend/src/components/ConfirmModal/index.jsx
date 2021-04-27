import React from "react";
import css from "./ConfirmModal.module.css";
import Modal from "@components/Modal";

const ConfirmModal = (props) => {
  const { children, onConfirm, onDecline, component } = props;
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
      {component ? children : <p className={css.text}>{children}</p>}
    </Modal>
  );
};

export default ConfirmModal;
