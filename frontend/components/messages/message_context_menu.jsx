import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { openModal } from "../../actions/ui_actions";

const MessageContextMenu = ({
  isAuthor,
  toggleContext,
  toggleEdit,
  id,
  oModal,
}) => {
  const {
    push,
    location: { pathname },
  } = useHistory();

  const handleEdit = () => {
    toggleEdit();
    toggleContext();
  };

  const handleDelete = () => {
    push(`${pathname}?m=${id}`);
    oModal("messageDelete");
  };

  const handleCopy = () => {
    document.execCommand("copy");
    toggleContext();
  };

  const textSelected = Boolean(window.getSelection().toString().length);

  return (
    <>
      {textSelected && (
        <>
          <button type="button" onClick={handleCopy}>
            Copy
            <FontAwesomeIcon icon="copy" />
          </button>
          <div className="menu-divider" />
        </>
      )}
      {isAuthor && (
        <button type="button" onClick={handleEdit}>
          Edit Message
        </button>
      )}
      <button type="button" className="disabled">
        Pin Message
      </button>
      {isAuthor && (
        <button type="button" className="msg-delete" onClick={handleDelete}>
          Delete Message
        </button>
      )}
    </>
  );
};

const mDTP = (dispatch) => ({
  oModal: (modal) => dispatch(openModal(modal)),
});

const MessageContextMenuContainer = connect(null, mDTP)(MessageContextMenu);

export default MessageContextMenuContainer;
