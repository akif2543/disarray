import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import UserBar from "../../user/user_bar";
import ServerDropdown from "../menus/server_dropdown";
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
  canAct,
}) => {
  // const { serverId } = match.params;

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

  const { id, name, owner } = server;
  const isOwner = currentUser.id === owner;

  return (
    <section className="side-bar server">
      <header className="server-head">
        <button
          type="button"
          onClick={toggleDropdown}
          className="dropdown-trigger"
        >
          <h1>{name}</h1>
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
          id={id}
          isOwner={isOwner}
          canAct={canAct}
          toggleDropdown={toggleDropdown}
          openModal={openModal}
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
