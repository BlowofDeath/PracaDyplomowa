import React from "react";
import ReactDOM from "react-dom";
import css from "./Modal.module.css";

const CustomModal = ({ open, setOpenModal, children }) => {
  return (
    open &&
    ReactDOM.createPortal(
      <div className={css.backdrop} onClick={() => setOpenModal(false)}>
        <div className={css.modal} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>,
      document.body
    )
  );
};

export default CustomModal;
