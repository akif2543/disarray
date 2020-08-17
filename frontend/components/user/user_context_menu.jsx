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
import { createConversation } from "../../actions/conversation_actions";

const UserContextMenu = ({
  currentUser,
  user,
  createConvo,
  addFriend,
  unblockUser,
  openModal,
  dir,
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
  const notMe = currentUser.id !== id;

  const handleModal = (modal) => () => {
    push(`${pathname}?u=${id}`);
    openModal(modal);
  };

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

  let style;

  if (el && el.current) {
    const { width } = el.current.getBoundingClientRect();
    style = {
      right: `-${width + 18}px`,
      top: 0,
    };
  }

  return (
    <>
      <button type="button" onClick={handleModal("profile")}>
        Profile
      </button>
      {notMe && (
        <>
          <button type="button" onClick={handleMessage}>
            Message
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
            {submenu && <ServerListContainer id={id} el={el} dir={dir} />}
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
  createConversation: (convo) => dispatch(createConversation(convo)),
});

const UserContextMenuContainer = connect(mSTP, mDTP)(UserContextMenu);

export default UserContextMenuContainer;
