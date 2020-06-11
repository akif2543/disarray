import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getCurrentUser } from "../../reducers/selectors";
import { createConversation } from "../../actions/conversation_actions";

const MemberPopout = ({
  m,
  togglePopout,
  currentUser,
  createConversation,
  history,
}) => {
  const [body, setBody] = useState("");

  const handleChange = (e) => setBody(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const convo = { user1_id: currentUser.id, user2_id: m.id, body };
    createConversation(convo).then((action) => {
      debugger;
      const [c] = Object.values(action.conversation);
      return history.push(`/@me/${c.id}`);
    });
  };

  return (
    <div className="popout-bg" onClick={togglePopout}>
      <div className="popout" onClick={(e) => e.stopPropagation()}>
        <header>
          <img src={m.avatar} alt="" />
          <div className="user">
            <h1>{m.username}</h1>
            <h2>#{m.discriminator}</h2>
          </div>
        </header>
        <footer>
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
    </div>
  );
};

const mSTP = (state) => ({
  currentUser: getCurrentUser(state),
});

const mDTP = (dispatch) => ({
  createConversation: (convo) => dispatch(createConversation(convo)),
});

const MemberPopoutContainer = withRouter(connect(mSTP, mDTP)(MemberPopout));

export default MemberPopoutContainer;
