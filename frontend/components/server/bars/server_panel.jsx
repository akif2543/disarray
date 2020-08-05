import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import UserBar from "../../user/user_bar";
import ServerDropdown from "./server_dropdown";
import ChannelList from "../../channel/channel_list";

const ServerPanel = ({
  server,
  fetchServer,
  match,
  openModal,
  currentUser,
  channels,
  openSettings,
  setActive,
}) => {

  const { serverId } = match.params;

  const [dropdown, setDropdown] = useState(false);
  const [clicked, setClicked] = useState(false);

  // useEffect(() => {
  //   if (server && !server.visited) fetchServer(serverId);
  // }, [serverId]);

  const toggleDropdown = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
      setDropdown(!dropdown);
    }, 350);
  };

  const isOwner = currentUser.id === server.owner;

  return (
    <section className="side-bar server">
      <header className="server-head">
        <button
          type="button"
          onClick={toggleDropdown}
          className="dropdown-trigger"
        >
          <h1>{server.name}</h1>
          {dropdown ? (
            <FontAwesomeIcon
              icon="times"
              size="lg"
              className={clicked ? "close-dropdown" : ""}
            />
          ) : (
            <FontAwesomeIcon
              icon="angle-down"
              size="lg"
              className={clicked ? "open-dropdown" : ""}
            />
          )}
        </button>
      </header>
      {dropdown && (
        <ServerDropdown
          toggleDropdown={toggleDropdown}
          openModal={openModal}
          isOwner={isOwner}
          openSettings={openSettings}
        />
      )}
      <ChannelList
        channels={channels}
        isOwner={isOwner}
        openModal={openModal}
        openSettings={openSettings}
        setActive={setActive}
        server={server}
        match={match}
      />
      <UserBar currentUser={currentUser} openSettings={openSettings} />
    </section>
  );
};

export default ServerPanel;
