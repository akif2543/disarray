import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import shortid from "shortid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Tooltip from "../ui/tooltip";
import DMDropdownContainer from "./dm_dropdown";

const ConversationList = ({ conversations, currentUser }) => {
  const el = useRef(null);
  const [tooltip, setTooltip] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const showTooltip = () => setTooltip(true);
  const hideTooltip = () => setTooltip(false);
  const toggleDropdown = () => setDropdown(!dropdown);

  const seen = [];

  return (
    <div className="channel-list-wrapper">
      <nav className="channel-list convo">
        <header>
          <h2>DIRECT MESSAGES</h2>
          <div className="add-channel-group" ref={el}>
            {tooltip && (
              <Tooltip text="Create DM" className="cl-tt add-dm" el={el} />
            )}
            <FontAwesomeIcon
              icon="plus"
              className="add-channel"
              onClick={toggleDropdown}
              onMouseOver={showTooltip}
              onFocus={showTooltip}
              onMouseOut={hideTooltip}
              onBlur={hideTooltip}
            />
            {dropdown && (
              <DMDropdownContainer toggleDropdown={toggleDropdown} />
            )}
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
    </div>
  );
};

export default ConversationList;
