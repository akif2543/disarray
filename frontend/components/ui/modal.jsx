import React, { useEffect } from "react";
import { connect } from "react-redux";

import { closeModal } from "../../actions/ui_actions";
import ServerModalContainer from "../server/modals/server_modal_container";
import ServerActionsContainer from "../server/modals/server_actions_container";
import MessageModalContainer from "../messages/message_modal_container";
import DeleteAccountContainer from "../user/delete_account_container";
import FriendModalContainer from "../friends/friend_modal";
import ProfileContainer from "../user/profile";
import DMModalContainer from "../conversation/dm_modal";

const Modal = ({ modal, id, closeModal }) => {
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
      component = <ServerActionsContainer action="invite" id={id} />;
      break;
    case "leave":
      component = <ServerActionsContainer action="leave" id={id} />;
      break;
    case "delete":
      component = <ServerActionsContainer action="delete" id={id} />;
      break;
    case "add channel":
      component = <ServerActionsContainer action="add channel" id={id} />;
      break;
    case "delete channel":
      component = <ServerActionsContainer action="delete channel" id={id} />;
      break;
    case "alias":
      component = <ServerActionsContainer action="alias" id={id} />;
      break;
    case "messageDelete":
      component = <MessageModalContainer id={id} del />;
      break;
    case "accountDelete":
      component = <DeleteAccountContainer />;
      break;
    case "unfriend":
      component = <FriendModalContainer id={id} unfriend />;
      break;
    case "block":
      component = <FriendModalContainer id={id} />;
      break;
    case "profile":
      component = <ProfileContainer id={id} />;
      break;
    case "leave dm":
      component = <DMModalContainer id={id} />;
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
  modal: state.ui.modal.name,
  id: state.ui.modal.id,
});

const mDTP = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
});

const ModalContainer = connect(mSTP, mDTP)(Modal);

export default ModalContainer;
