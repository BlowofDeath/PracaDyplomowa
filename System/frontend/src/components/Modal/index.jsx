import React from "react";
import ReactDOM from "react-dom";
import css from "./Modal.module.css";
import CloseIcon from "@material-ui/icons/Close";
import LoadingSpinner from "@components/LoadingSpinner";

const CustomModal = ({
  open,
  setOpenModal,
  children,
  header,
  buttons,
  isLoading,
}) => {
  return (
    open &&
    ReactDOM.createPortal(
      <div className={css.backdrop} onClick={() => setOpenModal(false)}>
        <div className={css.modal} onClick={(e) => e.stopPropagation()}>
          {header && (
            <div className={css.header}>
              <h2>{header}</h2>
              <CloseIcon onClick={() => setOpenModal(false)} />
            </div>
          )}
          <div className={css.content}>{children}</div>
          <div className={css.footer}>
            <div>{isLoading && <LoadingSpinner />}</div>
            <div>{buttons}</div>
          </div>
        </div>
      </div>,
      document.body
    )
  );
};

export default CustomModal;
