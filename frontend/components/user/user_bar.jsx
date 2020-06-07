import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "../ui/tooltip";

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

  return (
    <div className="user-bar">
      <div className="user">
        <div className="avatar">
          <img src={currentUser.avatar} alt="" />
        </div>
        <ul className="info">
          <h1>{currentUser.username}</h1>
          <h2>#{currentUser.discriminator}</h2>
        </ul>
      </div>
      <ul className="user-bar-ilist">
        {mute && <Tooltip text="Mute" className="u-bar-tt" />}
        <button
          type="button"
          className="user-bar-icon"
          onMouseOver={showMute}
          onFocus={showMute}
          onMouseOut={hideMute}
          onBlur={hideMute}
        >
          <FontAwesomeIcon icon="microphone" />
        </button>

        {deafen && <Tooltip text="Deafen" className="u-bar-tt" />}
        <button
          type="button"
          className="user-bar-icon"
          onMouseOver={showDeafen}
          onFocus={showDeafen}
          onMouseOut={hideDeafen}
          onBlur={hideDeafen}
        >
          <FontAwesomeIcon icon="headphones-alt" />
        </button>
        {settings && <Tooltip text="User Settings" className="u-bar-tt" />}
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
      </ul>
    </div>
  );
};

export default UserBar;
