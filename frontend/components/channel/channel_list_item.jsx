import React, { useState, useRef, memo, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Tooltip from "../ui/tooltip";
import ContextMenu from "../ui/context_menu";

const areEqual = (prevProps, nextProps) => {
  if (prevProps.channel.name !== nextProps.channel.name) return false;
  if (prevProps.isActive !== nextProps.isActive) return false;
  return true;
};

const ChannelListItem = ({
  channel,
  openModal,
  openSettings,
  isOwner,
  collapse,
}) => {
  const inviteEl = useRef(null);
  const editEl = useRef(null);
  const el = useRef(null);

  const [tooltips, setTooltips] = useState({ invite: false, edit: false });
  const [context, setContext] = useState(false);
  const [userClick, setUserClick] = useState([]);

  const showTooltip = (type) => () =>
    setTooltips({ ...tooltips, [type]: true });
  const hideTooltip = (type) => () =>
    setTooltips({ ...tooltips, [type]: false });

  const toggleContext = () => setContext(!context);

  const handleContext = (e) => {
    e.preventDefault();
    setContext(true);
    setUserClick([e.clientX, e.clientY]);
  };

  useEffect(() => {
    if (el && el.current) {
      el.current.addEventListener("contextmenu", handleContext);
    }
    return () => {
      if (el && el.current) {
        el.current.removeEventListener("contextmenu", handleContext);
      }
    };
  }, [el]);

  const { invite, edit } = tooltips;

  const { id, hasUnreads, name, server } = channel;

  const handleClick = (e) => {
    if (inviteEl.current.contains(e.target)) {
      e.preventDefault();
      return openModal({ name: "invite", id: server });
    }
    if (editEl.current.contains(e.target)) {
      e.preventDefault();
      return openSettings({ name: "channel", id });
    }
  };

  return (
    <>
      <NavLink
        className={collapse ? "hide" : ""}
        to={`/channels/${server}/${id}`}
        onClick={handleClick}
      >
        <button
          type="button"
          className={hasUnreads ? "channel-tab unread" : "channel-tab"}
          ref={el}
        >
          <div>
            <FontAwesomeIcon icon="hashtag" size="lg" className="hashtag" />
            <h3>{name}</h3>
          </div>
          <div className="icon-grp">
            <div ref={inviteEl}>
              <FontAwesomeIcon
                icon="user-plus"
                onMouseOver={showTooltip("invite")}
                onFocus={showTooltip("invite")}
                onMouseOut={hideTooltip("invite")}
                onBlur={hideTooltip("invite")}
              />
            </div>
            {invite && (
              <Tooltip
                text="Create Invite"
                className="cl-tt inv"
                el={inviteEl}
              />
            )}

            {isOwner && (
              <div ref={editEl}>
                <FontAwesomeIcon
                  icon="cog"
                  onMouseOver={showTooltip("edit")}
                  onFocus={showTooltip("edit")}
                  onMouseOut={hideTooltip("edit")}
                  onBlur={hideTooltip("edit")}
                />
                {edit && (
                  <Tooltip
                    text="Edit Channel"
                    className="cl-tt edit"
                    el={editEl}
                  />
                )}
              </div>
            )}
          </div>
        </button>
      </NavLink>
      {context && (
        <ContextMenu
          type="channel"
          coords={userClick}
          toggleContext={toggleContext}
          id={id}
          isOwner={isOwner}
          s={server}
        />
      )}
    </>
  );
};

export default memo(ChannelListItem, areEqual);
