import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getCurrentUser, getCurrentServer } from "../../reducers/selectors";
import {
  createConversation,
  directMessage,
} from "../../actions/conversation_actions";
import AvatarWithStatus from "./avatar_with_status";

const UserPopout = ({
  m,
  s,
  togglePopout,
  u,
  createConversation,
  history,
  directMessage,
  el,
  chat,
}) => {
  const [body, setBody] = useState("");
  const node = useRef(null);
  const handleChange = (e) => setBody(e.target.value);

  let style;

  const handleClick = (e) => {
    if (node.current.contains(e.target)) return;
    togglePopout();
  };

  const handleEsc = (e) => {
    if (e.key === "Escape") togglePopout();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick, false);
    document.addEventListener("keydown", handleEsc, false);
    return () => {
      document.removeEventListener("mousedown", handleClick, false);
      document.removeEventListener("keydown", handleEsc, false);
    };
  }, []);

  if (el && el.current) {
    const { top, bottom, width } = el.current.getBoundingClientRect();
    const below = window.innerHeight - bottom;

    if (chat) {
      const offsetX = width + 10;
      style =
        top > below
          ? {
              position: "fixed",
              bottom: `${below}px`,
              transform: `translateX(${offsetX}px)`,
            }
          : {
              position: "fixed",
              top: `${top}px`,
              transform: `translateX(${offsetX}px)`,
            };
    } else {
      style =
        top > below
          ? { position: "absolute", right: "230px", bottom: `${below}px` }
          : { position: "absolute", right: "230px", top: `${top}px` };
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const c = u.conversees[m.id];

    if (c) {
      const message = { body };
      directMessage(c, message).then(history.push(`/@me/${c}`));
    } else {
      const convo = { other_id: m.id, body };
      createConversation(convo).then((action) => {
        const [cv] = Object.values(action.conversation);
        return history.push(`/@me/${cv.id}`);
      });
    }
  };

  const hasAlias = s && m.servers[s.id];

  return (
    <div className="popout" ref={node} style={style}>
      <header className="popout-head">
        <AvatarWithStatus avatar={m.avatar} online={m.online} m />
        {hasAlias && <h1 className="member-alias">{m.servers[s.id]}</h1>}
        <div className={hasAlias ? "user with-alias" : "user"}>
          <h1>{m.username}</h1>
          <h2>#{m.discriminator}</h2>
        </div>
      </header>
      <footer className="popout-foot">
        {m.id !== u.id && (
          <form onSubmit={handleSubmit} className="dm-message-form">
            <input
              type="text"
              placeholder={`Message @${m.username}`}
              value={body}
              onChange={handleChange}
              autoFocus
            />
          </form>
        )}
        <p>
          <span>PROTIP:</span>
          {"  "}
          Right click user for more actions
        </p>
      </footer>
    </div>
  );
};

const mSTP = (state, ownProps) => ({
  u: getCurrentUser(state),
  s: getCurrentServer(state, ownProps),
});

const mDTP = (dispatch) => ({
  createConversation: (convo) => dispatch(createConversation(convo)),
  directMessage: (id, message) => dispatch(directMessage(id, message)),
});

const UserPopoutContainer = withRouter(connect(mSTP, mDTP)(UserPopout));

export default UserPopoutContainer;
