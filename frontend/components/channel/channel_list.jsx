import React, { useState } from "react";
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
  const [collapse, setCollapse] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  const toggleCollapse = () => setCollapse(!collapse);
  const showTooltip = () => setTooltip(true);
  const hideTooltip = () => setTooltip(false);

  const seen = [];

  const c = channels.map((channel) => {
    if (channel === undefined) return null;
    if (seen.includes(channel.id)) return null;
    seen.push(channel.id);
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
          <div className="add-channel-group">
            {tooltip && <Tooltip text="Create Channel" className="cl-tt add" />}
            <FontAwesomeIcon
              icon="plus"
              className="add-channel"
              onClick={() => openModal("add channel")}
              onMouseOver={showTooltip}
              onFocus={showTooltip}
              onMouseOut={hideTooltip}
              onBlur={hideTooltip}
            />
          </div>
        )}
      </header>
      <ul>{c}</ul>
    </nav>
  );
};

export default ChannelList;

{
  /* <button type="button">
  <div>
    <FontAwesomeIcon icon="hashtag" size="lg" className="hashtag" />
    <h3>{channel.name}</h3>
  </div>
  <div className="icon-grp">
    <FontAwesomeIcon icon="user-plus" onClick={() => openModal("invite")} />
    {isOwner && (
      <FontAwesomeIcon icon="cog" onClick={() => openSettings("channel")} />
    )}
  </div>
</button>; */
}