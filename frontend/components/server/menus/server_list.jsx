import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { generate } from "shortid";

import { getUserServers, getCurrentUser } from "../../../reducers/selectors";
import {
  directMessage,
  createConversation,
} from "../../../actions/conversation_actions";

const ServerList = ({
  el,
  id,
  dir,
  servers,
  user,
  directMessage,
  createConversation,
}) => {
  const { push } = useHistory();

  const handleInvite = (name, code) => () => {
    const c = user.conversees[id];

    if (c) {
      directMessage(c, {
        body: `Hi! Use the code ${code} to join ${name}.`,
      }).then(push(`/@me/${c}`));
    } else {
      const convo = {
        other_id: id,
        body: `Hi! Use the code ${code} to join ${name}.`,
      };
      createConversation(convo).then((action) => {
        const [cv] = Object.values(action.conversation);
        return push(`/@me/${cv.id}`);
      });
    }
  };

  let style;

  if (el && el.current) {
    const { width } = el.current.getBoundingClientRect();
    style = {
      right: dir === "right" ? `-${width + 18}px` : `${width + 18}px`,
    };
  }

  return (
    <div className="context-menu" style={style}>
      {servers.map((s) => (
        <button
          type="button"
          key={generate()}
          onClick={handleInvite(s.name, s.joinCode)}
        >
          {s.name}
        </button>
      ))}
    </div>
  );
};

const mSTP = (state) => ({
  servers: getUserServers(state),
  user: getCurrentUser(state),
});

const mDTP = (dispatch) => ({
  directMessage: (id, message) => dispatch(directMessage(id, message)),
  createConversation: (convo) => dispatch(createConversation(convo)),
});

const ServerListContainer = connect(mSTP, mDTP)(ServerList);

export default ServerListContainer;
