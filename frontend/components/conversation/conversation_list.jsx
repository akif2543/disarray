import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import shortid from "shortid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Tooltip from "../ui/tooltip";
import NewGroupDMContainer from "./new_group_dm";
import ConversationListItem from "./conversation_list_item";

const ConversationList = ({
  conversations,
  setActive,
  currentUser,
  match: {
    params: { conversationId },
  },
}) => {
  const el = useRef(null);
  const [tooltip, setTooltip] = useState(false);
  const [popout, setPopout] = useState(false);
  const showTooltip = () => setTooltip(true);
  const hideTooltip = () => setTooltip(false);
  const togglePopout = () => setPopout(!popout);

  const seen = new Set();

  const handleClick = (id) => () => setActive(id);

  return (
    <div className="channel-list-wrapper">
      <nav className="channel-list convo">
        <div className="tabs">
          <NavLink exact to="/@me" onClick={handleClick(null)}>
            <button type="button" className="friends-btn">
              <FontAwesomeIcon icon="users" size="lg" />
              <h2>Friends</h2>
            </button>
          </NavLink>
        </div>
        <header className="dm-list-head">
          <h2>DIRECT MESSAGES</h2>
          <div className="add-channel-group" ref={el}>
            {tooltip && (
              <Tooltip text="Create DM" className="cl-tt add-dm" el={el} />
            )}
            <FontAwesomeIcon
              icon="plus"
              className="add-channel"
              onClick={togglePopout}
              onMouseOver={showTooltip}
              onFocus={showTooltip}
              onMouseOut={hideTooltip}
              onBlur={hideTooltip}
            />
            {popout && (
              <NewGroupDMContainer togglePopout={togglePopout} el={el} />
            )}
          </div>
        </header>
        <ul>
          {conversations.map((convo) => {
            if (convo === undefined) return null;
            if (seen.has(convo.id)) return null;
            seen.add(convo.id);
            return (
              <NavLink
                to={`/@me/${convo.id}`}
                key={shortid.generate()}
                onClick={handleClick(convo.id)}
              >
                <ConversationListItem
                  convo={convo}
                  isActive={parseInt(conversationId) === convo.id}
                  currentUser={currentUser}
                />
              </NavLink>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default ConversationList;
