import React from "react";
import { connect } from "react-redux";

import { unfriend, block } from "../../actions/friend_actions";
import { closeModal } from "../../actions/ui_actions";

const FriendModal = ({
  user: { username, id },
  unfriend,
  close,
  removeFriend,
  blockUser,
}) => {
  const handleClick = () =>
    (unfriend ? removeFriend(id) : blockUser(id)).then(close());

  return (
    <div className="modal-confirm unfriend">
      <header>
        {unfriend ? (
          <h1>REMOVE '{username.toUpperCase()}'</h1>
        ) : (
          <h1>BLOCK {username.toUpperCase()}?</h1>
        )}
        {unfriend ? (
          <h2>
            Are you sure you want to permanently remove{" "}
            <strong>{username}</strong> from your friends?
          </h2>
        ) : (
          <h2>
            Are you sure you want to block <strong>{username}</strong>? Blocking
            this user will also remove them from your friends list.
          </h2>
        )}
      </header>
      <footer>
        <button type="button" onClick={close} className="cancel">
          Cancel
        </button>
        <button type="button" onClick={handleClick} className="leave">
          {unfriend ? "Remove Friend" : "Block"}
        </button>
      </footer>
    </div>
  );
};

const mSTP = (state, ownProps) => ({
  user: state.entities.users[ownProps.id],
});

const mDTP = (dispatch) => ({
  removeFriend: (id) => dispatch(unfriend(id)),
  close: () => dispatch(closeModal()),
  blockUser: (id) => dispatch(block(id)),
});

const FriendModalContainer = connect(mSTP, mDTP)(FriendModal);

export default FriendModalContainer;
