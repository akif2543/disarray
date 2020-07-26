import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "../ui/tooltip";
import AvatarWithStatus from "./avatar_with_status";

const UserBar = ({ currentUser, openSettings }) => {
  const [settings, setSettings] = useState(false);
  const [deafen, setDeafen] = useState(false);
  const [mute, setMute] = useState(false);

  const showSettings = () => setSettings(true);
  const hideSettings = () => setSettings(false);
  const showDeafen = () => setDeafen(true);
  const hideDeafen = () => setDeafen(false);
  const showMute = () => setMute(true);
  const hideMute = () => setMute(false);

  const { avatar, online, username, discriminator } = currentUser;

  return (
    <div className="user-bar">
      <div className="user">
        {/* <div className="avatar-frame"> */}
        <AvatarWithStatus avatar={avatar} online={online} u />
        {/* </div> */}
        <ul className="info">
          <h1>{username}</h1>
          <h2>#{discriminator}</h2>
        </ul>
      </div>
      <ul className="user-bar-ilist">
        <button
          type="button"
          className="user-bar-icon disabled"
          onMouseOver={showMute}
          onFocus={showMute}
          onMouseOut={hideMute}
          onBlur={hideMute}
        >
          <FontAwesomeIcon icon="microphone" />
        </button>
        {mute && <Tooltip text="Mute" className="u-bar-tt mute" />}
        <button
          type="button"
          className="user-bar-icon disabled"
          onMouseOver={showDeafen}
          onFocus={showDeafen}
          onMouseOut={hideDeafen}
          onBlur={hideDeafen}
        >
          <FontAwesomeIcon icon="headphones-alt" />
        </button>
        {deafen && <Tooltip text="Deafen" className="u-bar-tt deafen" />}
        <button
          type="button"
          className="user-bar-icon"
          onClick={() => openSettings("user")}
          onMouseOver={showSettings}
          onFocus={showSettings}
          onMouseOut={hideSettings}
          onBlur={hideSettings}
        >
          <FontAwesomeIcon icon="cog" />
        </button>
        {settings && <Tooltip text="User Settings" className="u-bar-tt set" />}
      </ul>
    </div>
  );
};

export default UserBar;
