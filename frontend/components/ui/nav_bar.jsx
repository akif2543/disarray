import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "./tooltip";
import NewGroupDMContainer from "../conversation/new_group_dm";
import EditConversationName from "../conversation/edit_conversation_name";

const NavBar = ({
  channel,
  memberBar,
  toggleMemberBar,
  conversationName,
  customizeConversation,
  id,
  home,
  convo,
  group,
  isOwner,
  switchTab,
  active,
  pending,
}) => {
  const [tooltips, setTooltips] = useState({
    bell: false,
    pin: false,
    members: false,
    mentions: false,
    contact: false,
    add: false,
    call: false,
    dm: false,
  });

  const [edit, setEdit] = useState(false);
  const [popout, setPopout] = useState(false);
  const togglePopout = () => setPopout(!popout);

  const toggleEdit = () => setEdit(!edit);

  const muteEl = useRef(null);
  const callEl = useRef(null);
  const pinEl = useRef(null);
  const memEl = useRef(null);
  const addEl = useRef(null);
  const dmEl = useRef(null);
  const atEl = useRef(null);
  const gitEl = useRef(null);

  const showTooltip = (type) => () =>
    setTooltips({ ...tooltips, [type]: true });
  const hideTooltip = (type) => () =>
    setTooltips({ ...tooltips, [type]: false });

  const { bell, pin, members, mentions, contact, add, call, dm } = tooltips;

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

      {convo && (
        <div className="dm-name">
          {group ? (
            <FontAwesomeIcon
              icon="user-friends"
              size="lg"
              style={{ height: "20px", width: "auto" }}
            />
          ) : (
            <FontAwesomeIcon icon="at" size="lg" />
          )}
          {edit ? (
            <EditConversationName
              conversationName={conversationName}
              id={id}
              customizeConversation={customizeConversation}
              toggleEdit={toggleEdit}
            />
          ) : (
            <h3
              className={group && isOwner ? "convo-name owner" : "convo-name"}
              onClick={group && isOwner ? toggleEdit : null}
            >
              {conversationName}
            </h3>
          )}
        </div>
      )}

      {home && (
        <div className="friends-bar">
          <div className="title">
            <FontAwesomeIcon icon="users" size="lg" />
            <h3>Friends</h3>
          </div>
          <nav>
            <button
              type="button"
              className={
                active === "online" ? "friends-tab active" : "friends-tab"
              }
              onClick={switchTab("online")}
              disabled={active === "online"}
            >
              <h3>Online</h3>
            </button>
            <button
              type="button"
              className={
                active === "all" ? "friends-tab active" : "friends-tab"
              }
              onClick={switchTab("all")}
              disabled={active === "all"}
            >
              <h3>All</h3>
            </button>
            <button
              type="button"
              className={
                active === "pending" ? "friends-tab active" : "friends-tab"
              }
              onClick={switchTab("pending")}
              disabled={active === "pending"}
            >
              <h3>Pending</h3>
              {Boolean(pending) && (
                <div className="notification">
                  {pending < 10 ? pending : "9+"}
                </div>
              )}
            </button>
            <button
              type="button"
              className={
                active === "blocked" ? "friends-tab active" : "friends-tab"
              }
              onClick={switchTab("blocked")}
              disabled={active === "blocked"}
            >
              <h3>Blocked</h3>
            </button>
            <button
              type="button"
              className={active === "add" ? "add-friend active" : "add-friend"}
              onClick={switchTab("add")}
              disabled={active === "add"}
            >
              <h3>Add Friend</h3>
            </button>
          </nav>
        </div>
      )}

      <div className="nav-icon-group">
        {channel && (
          <div className="channel">
            <button
              type="button"
              className="nav-icon f disabled"
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
              className="nav-icon disabled"
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
        {convo && (
          <div className="channel">
            <button
              type="button"
              className="nav-icon f disabled"
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
              className="nav-icon disabled"
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
              onClick={togglePopout}
              ref={addEl}
            >
              <FontAwesomeIcon icon="user-plus" />
            </button>
            {add && (
              <Tooltip
                text="Add Friends to DM"
                className="nav-tt add-user"
                el={addEl}
              />
            )}
            {popout && (
              <NewGroupDMContainer
                togglePopout={togglePopout}
                el={addEl}
                nav
                more
                switchTab={switchTab}
              />
            )}
            {group && (
              <div>
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
          </div>
        )}
        {home ? (
          <div className="grp-dm">
            <button
              type="button"
              className="nav-icon"
              onMouseOver={showTooltip("dm")}
              onFocus={showTooltip("dm")}
              onMouseOut={hideTooltip("dm")}
              onBlur={hideTooltip("dm")}
              onClick={togglePopout}
              ref={dmEl}
            >
              <FontAwesomeIcon icon="comment-alt" size="lg" />
            </button>
            {dm && (
              <Tooltip text="New Group DM" className="nav-tt dm" el={dmEl} />
            )}
            {popout && (
              <NewGroupDMContainer
                togglePopout={togglePopout}
                el={dmEl}
                nav
                switchTab={switchTab}
              />
            )}
          </div>
        ) : (
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search [NYI]"
              className="search-bar"
            />
            <FontAwesomeIcon icon="search" className="search-icon" />
          </div>
        )}
        <div className="user-icons">
          <button
            type="button"
            className="nav-icon disabled"
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
              className={home ? "nav-tt ath" : "nav-tt at"}
              el={atEl}
            />
          )}
          <a
            href="https://www.github.com/akif2543/disarray"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              type="button"
              className="nav-icon"
              onMouseOver={showTooltip("contact")}
              onFocus={showTooltip("contact")}
              onMouseOut={hideTooltip("contact")}
              onBlur={hideTooltip("contact")}
              ref={gitEl}
            >
              <FontAwesomeIcon icon={["fab", "github"]} size="lg" />
            </button>
          </a>
          {contact && (
            <Tooltip
              text="Repo"
              className={home ? "nav-tt gith" : "nav-tt git"}
              el={gitEl}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
