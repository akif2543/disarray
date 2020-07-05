import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getCurrentUser } from "../../reducers/selectors";
import {
  createConversation,
  directMessage,
} from "../../actions/conversation_actions";

const MemberPopout = ({
  m,
  togglePopout,
  currentUser,
  createConversation,
  history,
  directMessage,
  el,
  chat,
}) => {
  const [body, setBody] = useState("");

  const handleChange = (e) => setBody(e.target.value);

  let node;
  let style;

  const handleClick = (e) => {
    if (node.contains(e.target)) return;
    togglePopout();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick, false);
    return () => document.removeEventListener("mousedown", handleClick, false);
  }, []);

  if (el && el.current) {
    const { top, bottom, right } = el.current.getBoundingClientRect();
    const below = window.innerHeight - bottom;

    if (chat) {
      const offsetX = right - 306;
      const offsetY = top - 50;
      style =
        top > below
          ? { bottom: `${below}px`, left: `${offsetX}px` }
          : { top: `${offsetY}px`, left: `${offsetX}px` };
    } else {
      style = top > below ? { bottom: `${below}px` } : { top: `${top}px` };
    }
  }

  const getConversation = () =>
    m.conversations.find((id) => currentUser.conversations.includes(id));

  const handleSubmit = (e) => {
    e.preventDefault();
    const c = getConversation();

    if (c > 0) {
      const message = { body };
      directMessage(c, message).then(history.push(`/@me/${c}`));
    } else {
      const convo = { user1_id: currentUser.id, user2_id: m.id, body };
      createConversation(convo).then((action) => {
        const [cv] = Object.values(action.conversation);
        return history.push(`/@me/${cv.id}`);
      });
    }
  };

  return (
    <div className="popout" ref={(elem) => (node = elem)} style={style}>
      <header className="popout-head">
        <img src={m.avatar} alt="" />
        <div className="user">
          <h1>{m.username}</h1>
          <h2>#{m.discriminator}</h2>
        </div>
      </header>
      <footer className="popout-foot">
        {m.id !== currentUser.id && (
          <form onSubmit={handleSubmit} className="dm-message-form">
            <input
              type="text"
              placeholder={`Message @${m.username}`}
              value={body}
              onChange={handleChange}
            />
          </form>
        )}
        <p>
          <span>PROTIP:</span>
          {"  "}
          Try restarting webpack
        </p>
      </footer>
    </div>
  );
};

const mSTP = (state) => ({
  currentUser: getCurrentUser(state),
});

const mDTP = (dispatch) => ({
  createConversation: (convo) => dispatch(createConversation(convo)),
  directMessage: (id, message) => dispatch(directMessage(id, message)),
});

const MemberPopoutContainer = withRouter(connect(mSTP, mDTP)(MemberPopout));

export default MemberPopoutContainer;
