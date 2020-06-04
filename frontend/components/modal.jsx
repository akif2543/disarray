import React from "react";
import { closeModal } from "../actions/ui_actions";
import { connect } from "react-redux";

const Modal = ({ modal, closeModal }) => {
  if (!modal) return null;

  let component;

  switch (modal) {
    case "new":
      component = this;
      break;
    case "invite":
      component = this;
      break;
    default:
      return null;
  }

  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={(e) => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
};

const mSTP = (state) => ({
  modal: state.ui.modal,
});

const mDTP = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
});

const ModalContainer = connect(mSTP, mDTP)(Modal);

export default ModalContainer;
