import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { getFriendFromPath } from "../../reducers/selectors";
import { unfriend } from "../../actions/friend_actions";
import { closeModal } from "../../actions/ui_actions";

const RemoveFriend = ({
  user: { username, id },
  closeModal,
  removeFriend,
  history: { push },
}) => {
  const handleClose = () => {
    closeModal();
    push("/@me");
  };

  const handleEsc = (e) => {
    if (e.key === "ESCAPE") handleClose();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEsc, false);
    return () => document.removeEventListener("keydown", handleEsc, false);
  }, []);

  const handleClick = () => {
    removeFriend(id).then(handleClose());
  };

  return (
    <div className="modal-confirm unfriend">
      <header>
        <h1>REMOVE '{username.toUpperCase()}'</h1>
        <h2>
          Are you sure you want to permanently remove{" "}
          <strong>{username}</strong> from your friends?
        </h2>
      </header>
      <footer>
        <button type="button" onClick={handleClose} className="cancel">
          Cancel
        </button>
        <button type="button" onClick={handleClick} className="leave">
          Remove Friend
        </button>
      </footer>
    </div>
  );
};

const mSTP = (state, ownProps) => ({
  user: getFriendFromPath(state, ownProps),
});

const mDTP = (dispatch) => ({
  removeFriend: (id) => dispatch(unfriend(id)),
  closeModal: () => dispatch(closeModal()),
});

const RemoveFriendContainer = withRouter(connect(mSTP, mDTP)(RemoveFriend));

export default RemoveFriendContainer;
