import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "../ui/tooltip";

const UserBar = ({ currentUser, openSettings }) => {
  const settingsEl = useRef(null);
  const deafenEl = useRef(null);
  const muteEl = useRef(null);

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
        <button
          type="button"
          className="user-bar-icon"
          onMouseOver={showMute}
          onFocus={showMute}
          onMouseOut={hideMute}
          onBlur={hideMute}
          ref={muteEl}
        >
          <FontAwesomeIcon icon="microphone" />
        </button>
        {mute && (
          <Tooltip text="Mute [NYI]" className="u-bar-tt mute" el={muteEl} />
        )}
        <button
          type="button"
          className="user-bar-icon"
          onMouseOver={showDeafen}
          onFocus={showDeafen}
          onMouseOut={hideDeafen}
          onBlur={hideDeafen}
          ref={deafenEl}
        >
          <FontAwesomeIcon icon="headphones-alt" />
        </button>
        {deafen && (
          <Tooltip text="Deafen [NYI]" className="u-bar-tt" el={deafenEl} />
        )}
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
        {settings && (
          <Tooltip text="User Settings" className="u-bar-tt" el={settingsEl} />
        )}
      </ul>
    </div>
  );
};

export default UserBar;
