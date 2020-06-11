import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import shortid from "shortid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Tooltip from "../ui/tooltip";

const ConversationList = ({ conversations, currentUser }) => {
  const [tooltip, setTooltip] = useState(false);
  const showTooltip = () => setTooltip(true);
  const hideTooltip = () => setTooltip(false);

  const seen = [];

  return (
    <nav className="channel-list convo">
      <header>
        <h2>DIRECT MESSAGES</h2>
        <div className="add-channel-group">
          {tooltip && <Tooltip text="Create DM" className="cl-tt add" />}
          <FontAwesomeIcon
            icon="plus"
            className="add-channel"
            // onClick={() => openModal("add channel")}
            onMouseOver={showTooltip}
            onFocus={showTooltip}
            onMouseOut={hideTooltip}
            onBlur={hideTooltip}
          />
        </div>
      </header>
      <ul>
        {conversations.map((convo) => {
          if (convo === undefined) return null;
          if (seen.includes(convo.id)) return null;
          seen.push(convo.id);

          const [m] = convo.members.filter((user) => user !== currentUser);
          return (
            <NavLink to={`/@me/${convo.id}`} key={shortid.generate()}>
              <button type="button" className="convo-li">
                <img src={m.avatar} alt="" />
                <h2>{m.username}</h2>
              </button>
            </NavLink>
          );
        })}
      </ul>
    </nav>
  );
};

export default ConversationList;
