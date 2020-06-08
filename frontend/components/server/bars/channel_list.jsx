import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import shortid from "shortid";
import { NavLink } from "react-router-dom";

const ChannelList = ({
  isOwner,
  openModal,
  channels,
  server,
  openSettings,
  history,
}) => {
  const [collapse, setCollapse] = useState(false);

  const toggleCollapse = () => setCollapse(!collapse);

  // const handleOpen = (channelId) => (e) => {
  //   history.push(`/channels/${server.id}/${channelId}`);
  //   return openSettings("channel");
  // };

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
        <button type="button">
          <div>
            <FontAwesomeIcon icon="hashtag" size="lg" className="hashtag" />
            <h3>{channel.name}</h3>
          </div>
          <div className="icon-grp">
            <FontAwesomeIcon
              icon="user-plus"
              onClick={() => openModal("invite")}
            />
            {isOwner && (
              <FontAwesomeIcon
                icon="cog"
                onClick={() => openSettings("channel")}
              />
            )}
          </div>
        </button>
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
          <FontAwesomeIcon
            icon="plus"
            className="add-channel"
            onClick={() => openModal("add channel")}
          />
        )}
      </header>
      <ul>{c}</ul>
    </nav>
  );
};

export default ChannelList;
