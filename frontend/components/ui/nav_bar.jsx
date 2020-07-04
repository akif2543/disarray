import React, { useState, useRef } from "react";
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

  const muteEl = useRef(null);
  const callEl = useRef(null);
  const pinEl = useRef(null);
  const memEl = useRef(null);
  const addEl = useRef(null);
  const atEl = useRef(null);
  const gitEl = useRef(null);

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

      <div
        className={
          !channel && !otherUser ? "nav-icon-group home" : "nav-icon-group"
        }
      >
        {channel && (
          <div className="channel">
            <button
              type="button"
              className="nav-icon f"
              onMouseOver={showTooltip("bell")}
              onFocus={showTooltip("bell")}
              onMouseOut={hideTooltip("bell")}
              onBlur={hideTooltip("bell")}
              ref={muteEl}
            >
              <FontAwesomeIcon icon="bell" size="lg" />
            </button>
            {bell && (
              <Tooltip
                text="Mute Channel [NYI]"
                className="nav-tt mute"
                el={muteEl}
              />
            )}
            <button
              type="button"
              className="nav-icon"
              onMouseOver={showTooltip("pin")}
              onFocus={showTooltip("pin")}
              onMouseOut={hideTooltip("pin")}
              onBlur={hideTooltip("pin")}
              ref={pinEl}
            >
              <FontAwesomeIcon
                icon="thumbtack"
                size="lg"
                transform={{ rotate: 45 }}
              />
            </button>
            {pin && (
              <Tooltip
                text="Pinned Messages [NYI]"
                className="nav-tt pin"
                el={pinEl}
              />
            )}
            <button
              type="button"
              className={memberBar ? "nav-icon active" : "nav-icon"}
              onClick={toggleMemberBar}
              onMouseOver={showTooltip("members")}
              onFocus={showTooltip("members")}
              onMouseOut={hideTooltip("members")}
              onBlur={hideTooltip("members")}
              ref={memEl}
            >
              <FontAwesomeIcon icon="user-friends" size="lg" />
            </button>
            {members && (
              <Tooltip
                text="Member List"
                className="nav-tt members"
                el={memEl}
              />
            )}
          </div>
        )}
        {otherUser && (
          <div className="channel">
            <button
              type="button"
              className="nav-icon f"
              onMouseOver={showTooltip("call")}
              onFocus={showTooltip("call")}
              onMouseOut={hideTooltip("call")}
              onBlur={hideTooltip("call")}
              ref={callEl}
            >
              <FontAwesomeIcon icon="phone-alt" size="lg" />
            </button>
            {call && (
              <Tooltip
                text="Start Voice Call [NYI]"
                className="nav-tt call"
                el={callEl}
              />
            )}
            <button
              type="button"
              className="nav-icon"
              onMouseOver={showTooltip("pin")}
              onFocus={showTooltip("pin")}
              onMouseOut={hideTooltip("pin")}
              onBlur={hideTooltip("pin")}
              ref={pinEl}
            >
              <FontAwesomeIcon
                icon="thumbtack"
                size="lg"
                transform={{ rotate: 45 }}
              />
            </button>
            {pin && (
              <Tooltip
                text="Pinned Messages [NYI]"
                className="nav-tt pin"
                el={pinEl}
              />
            )}
            <button
              type="button"
              className="nav-icon"
              onMouseOver={showTooltip("add")}
              onFocus={showTooltip("add")}
              onMouseOut={hideTooltip("add")}
              onBlur={hideTooltip("add")}
              ref={addEl}
            >
              <FontAwesomeIcon icon="user-plus" />
            </button>
            {add && (
              <Tooltip
                text="Add Friends to DM [NYI]"
                className="nav-tt add-user"
                el={addEl}
              />
            )}
          </div>
        )}
        <div
          className={
            !channel && !otherUser ? "search-wrapper home" : "search-wrapper"
          }
        >
          <input type="text" placeholder="Search" className="search-bar" />
          <FontAwesomeIcon icon="search" className="search-icon" />
        </div>
        <div className="user-icons">
          <button
            type="button"
            className="nav-icon"
            onMouseOver={showTooltip("mentions")}
            onFocus={showTooltip("mentions")}
            onMouseOut={hideTooltip("mentions")}
            onBlur={hideTooltip("mentions")}
            ref={atEl}
          >
            <FontAwesomeIcon icon="at" size="lg" />
          </button>
          {mentions && (
            <Tooltip
              text="Recent Mentions [NYI]"
              className="nav-tt at"
              el={atEl}
            />
          )}
          <button
            type="button"
            href="https://www.github.com/akif2543"
            className="nav-icon"
            onMouseOver={showTooltip("contact")}
            onFocus={showTooltip("contact")}
            onMouseOut={hideTooltip("contact")}
            onBlur={hideTooltip("contact")}
            ref={gitEl}
          >
            <FontAwesomeIcon icon={["fab", "github"]} size="lg" />
          </button>
          {contact && (
            <Tooltip text="Contact" className="nav-tt git" el={gitEl} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
