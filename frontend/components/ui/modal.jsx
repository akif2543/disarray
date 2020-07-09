import React, { useEffect } from "react";
import { connect } from "react-redux";

import { closeModal } from "../../actions/ui_actions";
import ServerModalContainer from "../server/modals/server_modal_container";
import ServerActionsContainer from "../server/modals/server_actions_container";
import MessageModalContainer from "../messages/message_modal_container";

const Modal = ({ modal, closeModal }) => {
  if (!modal) return null;

  let component;

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") return closeModal();
    });
    return () =>
      document.removeEventListener("keydown", (e) => {
        if (e.key === "Escape") return closeModal();
      });
  }, []);

  switch (modal) {
    case "portal":
      component = <ServerModalContainer />;
      break;
    case "invite":
      component = <ServerActionsContainer action="invite" />;
      break;
    case "leave":
      component = <ServerActionsContainer action="leave" />;
      break;
    case "delete":
      component = <ServerActionsContainer action="delete" />;
      break;
    case "add channel":
      component = <ServerActionsContainer action="add channel" />;
      break;
    case "delete channel":
      component = <ServerActionsContainer action="delete channel" />;
      break;
    case "messageDelete":
      component = <MessageModalContainer action="delete" />;
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
