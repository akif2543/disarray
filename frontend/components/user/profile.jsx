import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import AvatarWithStatus from "./avatar_with_status";
import {
  getFriendFromPath,
  getCurrentUser,
  getMutualServers,
  getMutualFriends,
} from "../../reducers/selectors";
import { requestFriend, fetchUser } from "../../actions/friend_actions";
import { openModal, closeModal } from "../../actions/ui_actions";
import { initials } from "../../util/format_util";
import { createConversation } from "../../actions/conversation_actions";
import { generate } from "shortid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Profile = ({
  user,
  cu,
  mutualServers,
  mutualFriends,
  fetchUser,
  addFriend,
  createConversation,
  closeModal,
  history: {
    push,
    location: { pathname },
  },
}) => {
  const [mutuals, setMutuals] = useState(true);
  const [menu, setMenu] = useState(false);

  const handleClose = () => {
    closeModal();
    push(pathname);
  };

  const {
    id,
    friends,
    servers,
    username,
    discriminator,
    avatar,
    online,
  } = user;

  useEffect(() => {
    if (user && !friends) fetchUser(id);
  }, []);

  const toggleMenu = () => setMenu(!menu);

  const handleMessage = () => {
    const c = cu.conversees[id];

    if (c) {
      push(`/@me/${c}`);
    } else {
      const convo = { other_id: id };
      createConversation(convo).then((action) => {
        const [cv] = Object.values(action.conversation);
        return push(`/@me/${cv.id}`);
      });
    }
  };

  const handleServer = (sId, active) => () => {
    closeModal();
    push(`/channels/${sId}/${active}`);
  };

  const isFriend = cu.friends.includes(id);
  const isBlocked = cu.blocked[id];
  const isPending = cu.pendingOut.includes(id);

  return (
    <div className="user-profile">
      <header className="profile-head">
        <div className="user">
          <AvatarWithStatus avatar={avatar} online={online} prof />
          <div className="user-info">
            <h1>{username}</h1>
            <span>{`#${discriminator}`}</span>
          </div>
        </div>
        <div className="btn-grp">
          {!isBlocked &&
            (isFriend ? (
              <button
                type="button"
                className="main-btn"
                onClick={handleMessage}
              >
                Send Message
              </button>
            ) : (
              <button
                type="button"
                className={isPending ? "main-btn disabled" : "main-btn"}
                onClick={addFriend(id)}
                disabled={isPending}
              >
                {isPending ? "Friend Request Sent" : "Send Friend Request"}
              </button>
            ))}
          <button type="button" className="menu-btn" onClick={toggleMenu}>
            <FontAwesomeIcon icon="ellipsis-v" />
          </button>
        </div>
      </header>
      <nav className="profile-nav">
        <button
          type="button"
          className={mutuals ? "active" : ""}
          onClick={() => setMutuals(true)}
          disabled={mutuals}
        >
          Mutual Servers
        </button>
        <button
          type="button"
          className={mutuals ? "" : "active"}
          onClick={() => setMutuals(false)}
          disabled={!mutuals}
        >
          Mutual Friends
        </button>
      </nav>
      <main className="profile-main">
        {mutuals &&
          (mutualServers.length ? (
            <>
              {mutualServers.map((s) => (
                <button
                  type="button"
                  key={generate()}
                  className="mutual"
                  onClick={handleServer(s.id, s.active)}
                >
                  {s.icon ? (
                    <img src={s.icon} alt="" className="server-icon" />
                  ) : (
                    <div className="server-icon none">
                      <h1>{initials(s.name)}</h1>
                    </div>
                  )}
                  <div className="server-info">
                    <h2>{s.name}</h2>
                    <span>{servers[s.id]}</span>
                  </div>
                </button>
              ))}
            </>
          ) : (
            <div className="mutuals-doodle servers">
              <h2>NO SERVERS IN COMMON</h2>
            </div>
          ))}
        {!mutuals &&
          (mutualFriends.length ? (
            <>
              {mutualFriends.map((f) => (
                <button
                  type="button"
                  key={generate()}
                  className="mutual"
                  onClick={() => push(`${pathname}?u=${f.id}`)}
                >
                  <AvatarWithStatus avatar={f.avatar} online={f.online} />
                  <div className="user-info">
                    <h2>{f.username}</h2>
                    <span>#{f.discriminator}</span>
                  </div>
                </button>
              ))}
            </>
          ) : (
            <div className="mutuals-doodle friends">
              <h2>NO FRIENDS IN COMMON</h2>
            </div>
          ))}
      </main>
    </div>
  );
};

const mSTP = (state, ownProps) => ({
  user: getFriendFromPath(state, ownProps),
  cu: getCurrentUser(state),
  mutualServers: getMutualServers(state, ownProps),
  mutualFriends: getMutualFriends(state, ownProps),
});

const mDTP = (dispatch) => ({
  fetchUser: (id) => dispatch(fetchUser(id)),
  addFriend: (id) => () => dispatch(requestFriend(id)),
  createConversation: (convo) => dispatch(createConversation(convo)),
  openModal: (modal) => () => dispatch(openModal(modal)),
  closeModal: () => dispatch(closeModal()),
});

const ProfileContainer = withRouter(connect(mSTP, mDTP)(Profile));

export default ProfileContainer;
