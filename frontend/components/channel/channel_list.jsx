import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import shortid from "shortid";
import { NavLink } from "react-router-dom";

import ChannelListItem from "./channel_list_item";
import Tooltip from "../ui/tooltip";

const ChannelList = ({
  isOwner,
  openModal,
  channels,
  server,
  openSettings,
  match,
}) => {
  const el = useRef(null);

  const [collapse, setCollapse] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  const toggleCollapse = () => setCollapse(!collapse);
  const showTooltip = () => setTooltip(true);
  const hideTooltip = () => setTooltip(false);

  const seen = new Set();

  const c = channels.map((channel) => {
    if (channel === undefined) return null;
    if (seen.has(channel.id)) return null;
    seen.add(channel.id);
    return (
      <NavLink
        to={`/channels/${server.id}/${channel.id}`}
        key={shortid.generate()}
        className={collapse ? "hide" : ""}
      >
        <ChannelListItem
          channel={channel}
          openModal={openModal}
          openSettings={openSettings}
          isOwner={isOwner}
          isActive={parseInt(match.params.channelId) === channel.id}
        />
      </NavLink>
    );
  });

  const { id } = server;

  return (
    <nav className="channel-list">
      <header>
        <h2 onClick={toggleCollapse}>
          {collapse ? (
            <FontAwesomeIcon icon="angle-right" size="xs" />
          ) : (
            <FontAwesomeIcon icon="angle-down" size="xs" />
          )}
          TEXT CHANNELS
        </h2>
        {isOwner && (
          <div className="add-channel-group" ref={el}>
            <FontAwesomeIcon
              icon="plus"
              className="add-channel"
              onClick={() => openModal({ name: "add channel", id })}
              onMouseOver={showTooltip}
              onFocus={showTooltip}
              onMouseOut={hideTooltip}
              onBlur={hideTooltip}
            />
            {tooltip && (
              <Tooltip text="Create Channel" className="cl-tt add" el={el} />
            )}
          </div>
        )}
      </header>
      <ul>{c}</ul>
    </nav>
  );
};

export default ChannelList;
