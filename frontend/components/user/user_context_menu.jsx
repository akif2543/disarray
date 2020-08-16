import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  getCurrentUser,
  getOtherUser,
  getUserServers,
} from "../../reducers/selectors";
import { openModal } from "../../actions/ui_actions";
import { requestFriend, unblock } from "../../actions/friend_actions";
import ServerListContainer from "../server/menus/server_list";

const UserContextMenu = ({
  currentUser,
  user,
  servers,
  addFriend,
  unblockUser,
  openModal,
}) => {
  const {
    push,
    location: { pathname },
  } = useHistory();

  const el = useRef(null);
  const [submenu, setSubmenu] = useState(false);

  const { id } = user;

  const isFriend = currentUser.friends.includes(id);
  const isBlocked = currentUser.blocked[id];

  const handleModal = (modal) => () => {
    push(`${pathname}?u=${id}`);
    openModal(modal);
  };

  return (
    <>
      <button type="button" onClick={handleModal("profile")}>
        Profile
      </button>
      <div className="menu-divider" />
      <div
        type="button"
        className="server-btn"
        onMouseEnter={() => setSubmenu(true)}
        onFocus={() => setSubmenu(true)}
        onBlur={() => setSubmenu(false)}
        onMouseLeave={() => setSubmenu(false)}
        ref={el}
      >
        Invite to Server
        <FontAwesomeIcon icon="angle-down" transform={{ rotate: -90 }} />
        {submenu && <ServerListContainer id={id} el={el} />}
      </div>

      {isFriend ? (
        <button type="button" onClick={handleModal("unfriend")}>
          Remove Friend
        </button>
      ) : (
        <button type="button" onClick={addFriend(id)}>
          Add Friend
        </button>
      )}
      {isBlocked ? (
        <button type="button" onClick={unblockUser(id)}>
          Unblock
        </button>
      ) : (
        <button type="button" onClick={handleModal("block")}>
          Block
        </button>
      )}
    </>
  );
};

const mSTP = (state, ownProps) => ({
  currentUser: getCurrentUser(state),
  user: getOtherUser(state, ownProps),
  servers: getUserServers(state),
});

const mDTP = (dispatch) => ({
  openModal: (modal) => dispatch(openModal(modal)),
  addFriend: (id) => () => dispatch(requestFriend(id)),
  unblockUser: (id) => () => dispatch(unblock(id)),
});

const UserContextMenuContainer = connect(mSTP, mDTP)(UserContextMenu);

export default UserContextMenuContainer;
