import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "./tooltip";

const NavBar = ({ channel, memberBar, toggleMemberBar }) => {
  const [tooltips, setTooltips] = useState({
    bell: false,
    pin: false,
    members: false,
    mentions: false,
    contact: false,
  });

  const showTooltip = (type) => () =>
    setTooltips({ ...tooltips, [type]: true });
  const hideTooltip = (type) => () =>
    setTooltips({ ...tooltips, [type]: false });

  const { bell, pin, members, mentions, contact } = tooltips;

  return (
    <nav className="nav-bar">
      {channel && (
        <div className="channel-name">
          <FontAwesomeIcon icon="hashtag" size="lg" /> <h3>{channel.name}</h3>
          {channel.topic && (
            <button type="button" className="topic">
              <h4>{channel.topic}</h4>
            </button>
          )}
        </div>
      )}

      <div className="nav-icon-group">
        {channel && (
          <div className="channel">
            {bell && <Tooltip text="Mute Channel [NYI]" className="nav-tt" />}
            <FontAwesomeIcon
              icon="bell"
              size="lg"
              className="nav-icon"
              onMouseOver={showTooltip("bell")}
              onFocus={showTooltip("bell")}
              onMouseOut={hideTooltip("bell")}
              onBlur={hideTooltip("bell")}
            />
            {pin && <Tooltip text="Pinned Messages [NYI]" className="nav-tt" />}
            <FontAwesomeIcon
              icon="thumbtack"
              size="lg"
              transform={{ rotate: 45 }}
              className="nav-icon"
              onMouseOver={showTooltip("pin")}
              onFocus={showTooltip("pin")}
              onMouseOut={hideTooltip("pin")}
              onBlur={hideTooltip("pin")}
            />
            {members && <Tooltip text="Member List" className="nav-tt" />}
            <FontAwesomeIcon
              icon="user-friends"
              size="lg"
              className={memberBar ? "nav-icon active" : "nav-icon"}
              onClick={toggleMemberBar}
              onMouseOver={showTooltip("members")}
              onFocus={showTooltip("members")}
              onMouseOut={hideTooltip("members")}
              onBlur={hideTooltip("members")}
            />
          </div>
        )}
        <div className="search-wrapper">
          <input type="text" placeholder="Search" className="search-bar" />
          <FontAwesomeIcon icon="search" className="search-icon" />
        </div>
        <div className="user-icons">
          {mentions && (
            <Tooltip
              text="Recent Mentions [NYI]"
              className="nav-tt"
              onMouseOver={showTooltip("mentions")}
              onFocus={showTooltip("mentions")}
              onMouseOut={hideTooltip("mentions")}
              onBlur={hideTooltip("mentions")}
            />
          )}
          <FontAwesomeIcon icon="at" size="lg" className="nav-icon" />
          {contact && <Tooltip text="Contact" className="nav-tt" />}
          <a href="https://www.github.com/akif2543">
            <FontAwesomeIcon
              icon={["fab", "github"]}
              size="lg"
              className="nav-icon"
              onMouseOver={showTooltip("Contact")}
              onFocus={showTooltip("Contact")}
              onMouseOut={hideTooltip("Contact")}
              onBlur={hideTooltip("Contact")}
            />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
