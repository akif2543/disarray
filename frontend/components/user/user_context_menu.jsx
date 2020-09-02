import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  getCurrentUser,
  getUserServers,
  getUser,
} from "../../reducers/selectors";
import { openModal } from "../../actions/ui_actions";
import { requestFriend, unblock } from "../../actions/friend_actions";
import ServerListContainer from "../server/menus/server_list";
import {
  createConversation,
  closeConversation,
} from "../../actions/conversation_actions";

const UserContextMenu = ({
  currentUser,
  user,
  createConvo,
  addFriend,
  unblockUser,
  modal,
  close,
  s,
  dm,
}) => {
  const { push } = useHistory();

  const el = useRef(null);
  const [submenu, setSubmenu] = useState(false);

  const { id } = user;

  const isFriend = currentUser.friends.includes(id);
  const isBlocked = currentUser.blocked[id];
  const notMe = currentUser.id !== id;

  const handleModal = (name) => () => modal({ name, id });

  const handleClose = () => close(dm, push);

  const handleMessage = () => {
    const c = currentUser.conversees[id];

    if (c) {
      push(`/@me/${c}`);
    } else {
      const convo = {
        other_id: id,
      };
      createConvo(convo).then((action) => {
        const [cv] = Object.values(action.conversation);
        return push(`/@me/${cv.id}`);
      });
    }
  };

  return (
    <>
      <button type="button" onClick={handleModal("profile")}>
        Profile
      </button>
      {notMe && !isBlocked && (
        <>
          {dm ? (
            <button type="button" onClick={handleClose}>
              Close DM
            </button>
          ) : (
            <button type="button" onClick={handleMessage}>
              Message
            </button>
          )}
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
          <button type="button" onClick={handleModal("block")}>
            Block
          </button>
        </>
      )}
      {notMe && isBlocked && (
        <>
          <div className="menu-divider" />
          <button type="button" onClick={unblockUser(id)}>
            Unblock
          </button>
        </>
      )}
      {!notMe && s && (
        <>
          <div className="menu-divider" />
          <button
            type="button"
            onClick={() => modal({ name: "alias", id: s.id })}
          >
            Change Nickname
          </button>
        </>
      )}
    </>
  );
};

const mSTP = (state, ownProps) => ({
  currentUser: getCurrentUser(state),
  user: getUser(state, ownProps),
  servers: getUserServers(state),
});

const mDTP = (dispatch) => ({
  modal: (modal) => dispatch(openModal(modal)),
  addFriend: (id) => () => dispatch(requestFriend(id)),
  unblockUser: (id) => () => dispatch(unblock(id)),
  createConvo: (convo) => dispatch(createConversation(convo)),
  close: (id, push) => dispatch(closeConversation(id, push)),
});

const UserContextMenuContainer = connect(mSTP, mDTP)(UserContextMenu);

export default UserContextMenuContainer;
