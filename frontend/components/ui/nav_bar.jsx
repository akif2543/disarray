import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "./tooltip";

const NavBar = ({ channel, memberBar, toggleMemberBar, otherUser }) => {
  const [tooltips, setTooltips] = useState({
    bell: false,
    pin: false,
    members: false,
    mentions: false,
    contact: false,
    add: false,
    call: false,
  });

  const showTooltip = (type) => () =>
    setTooltips({ ...tooltips, [type]: true });
  const hideTooltip = (type) => () =>
    setTooltips({ ...tooltips, [type]: false });

  const { bell, pin, members, mentions, contact, add, call } = tooltips;

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

      {otherUser && (
        <div className="dm-name">
          <FontAwesomeIcon icon="at" size="lg" />
          <h3>{otherUser.username}</h3>
        </div>
      )}

      <div className="nav-icon-group">
        {channel && (
          <div className="channel">
            {bell && (
              <Tooltip text="Mute Channel [NYI]" className="nav-tt bell" />
            )}
            <FontAwesomeIcon
              icon="bell"
              size="lg"
              className="nav-icon"
              onMouseOver={showTooltip("bell")}
              onFocus={showTooltip("bell")}
              onMouseOut={hideTooltip("bell")}
              onBlur={hideTooltip("bell")}
            />
            {pin && (
              <Tooltip text="Pinned Messages [NYI]" className="nav-tt pin" />
            )}
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
            {members && (
              <Tooltip text="Member List" className="nav-tt members" />
            )}
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
        {otherUser && (
          <div className="channel">
            {call && (
              <Tooltip text="Start Voice Call [NYI]" className="nav-tt bell" />
            )}
            <FontAwesomeIcon
              icon="phone-alt"
              // size="lg"
              className="nav-icon"
              onMouseOver={showTooltip("call")}
              onFocus={showTooltip("call")}
              onMouseOut={hideTooltip("call")}
              onBlur={hideTooltip("call")}
            />
            {pin && (
              <Tooltip text="Pinned Messages [NYI]" className="nav-tt pin" />
            )}
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
            {add && (
              <Tooltip
                text="Add Friends to DM [NYI]"
                className="nav-tt members"
              />
            )}
            <FontAwesomeIcon
              icon="user-plus"
              // size="lg"
              className={memberBar ? "nav-icon active" : "nav-icon"}
              onClick={toggleMemberBar}
              onMouseOver={showTooltip("add")}
              onFocus={showTooltip("add")}
              onMouseOut={hideTooltip("add")}
              onBlur={hideTooltip("add")}
            />
          </div>
        )}
        <div className="search-wrapper">
          <input type="text" placeholder="Search" className="search-bar" />
          <FontAwesomeIcon icon="search" className="search-icon" />
        </div>
        <div className="user-icons">
          {mentions && (
            <Tooltip text="Recent Mentions [NYI]" className="nav-tt mentions" />
          )}
          <FontAwesomeIcon
            icon="at"
            size="lg"
            className="nav-icon"
            onMouseOver={showTooltip("mentions")}
            onFocus={showTooltip("mentions")}
            onMouseOut={hideTooltip("mentions")}
            onBlur={hideTooltip("mentions")}
          />
          {contact && <Tooltip text="Contact" className="nav-tt contact" />}
          <a href="https://www.github.com/akif2543">
            <FontAwesomeIcon
              icon={["fab", "github"]}
              size="lg"
              className="nav-icon"
              onMouseOver={showTooltip("contact")}
              onFocus={showTooltip("contact")}
              onMouseOut={hideTooltip("contact")}
              onBlur={hideTooltip("contact")}
            />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
