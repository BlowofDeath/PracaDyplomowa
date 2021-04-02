import React from "react";
import Modal from "@material-ui/core/Modal";

const Modal = ({ openModal, setOpenModal }) => {
  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      Test
    </Modal>
  );
};

export default Modal;
