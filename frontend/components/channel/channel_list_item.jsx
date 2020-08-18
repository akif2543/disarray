import React, { useState, useRef, memo, useEffect } from "react";
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
  // isActive,
}) => {
  const inviteEl = useRef(null);
  const editEl = useRef(null);
  const el = useRef(null);

  const [tooltips, setTooltips] = useState({ invite: false, edit: false });
  // const [maxLength, setMaxLength] = useState(22);
  const [context, setContext] = useState(false);
  const [userClick, setUserClick] = useState([]);

  const showTooltip = (type) => () =>
    setTooltips({ ...tooltips, [type]: true });
  const hideTooltip = (type) => () =>
    setTooltips({ ...tooltips, [type]: false });

  // const hoverLength = () => setMaxLength(18);
  // const normalLength = () => setMaxLength(22);

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

  // const formatName = (name) => {
  //   if (name.length < 18) return name;
  //   if (isActive) return `${name.slice(0, 18)}...`;
  //   return name.length > 22 ? `${name.slice(0, maxLength)}...` : name;
  // };

  const { id, hasUnreads, name, server } = channel;

  const handleInvite = (e) => {
    e.stopPropagation();
    openModal({ name: "invite", id: server });
  };

  const handleSettings = (e) => {
    e.stopPropagation();
    openSettings({ name: "channel", id });
  };

  return (
    <>
      <button
        type="button"
        className={hasUnreads ? "channel-tab unread" : "channel-tab"}
        // onMouseOver={hoverLength}
        // onFocus={hoverLength}
        // onMouseOut={normalLength}
        // onBlur={normalLength}
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
              onClick={handleInvite}
              onMouseOver={showTooltip("invite")}
              onFocus={showTooltip("invite")}
              onMouseOut={hideTooltip("invite")}
              onBlur={hideTooltip("invite")}
            />
          </div>
          {invite && (
            <Tooltip text="Create Invite" className="cl-tt inv" el={inviteEl} />
          )}

          {isOwner && (
            <div ref={editEl}>
              <FontAwesomeIcon
                icon="cog"
                onClick={handleSettings}
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
