import React, { useEffect } from "react";
import { connect } from "react-redux";

import UserSettingsContainer from "../user/user_settings_container";
import ServerSettingsContainer from "../server/settings/server_settings_container";
import ChannelSettingsContainer from "../channel/channel_settings_container";
import { closeSettings } from "../../actions/ui_actions";

const Settings = ({ settings, id, closeSettings, modal }) => {
  if (!settings) return null;

  let component;

  const handleEsc = (e) => {
    if (modal) return;
    if (e.key === "Escape") return closeSettings();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [modal]);

  switch (settings) {
    case "user":
      component = <UserSettingsContainer />;
      break;
    case "server":
      component = <ServerSettingsContainer id={id} />;
      break;
    case "channel":
      component = <ChannelSettingsContainer id={id} s={99999} />;
      break;
    default:
      return null;
  }

  return <div className="settings">{component}</div>;
};

const mSTP = (state) => ({
  settings: state.ui.settings.name,
  modal: state.ui.modal.name,
  id: state.ui.settings.id,
});

const mDTP = (dispatch) => ({
  closeSettings: () => dispatch(closeSettings()),
});

const SettingsContainer = connect(mSTP, mDTP)(Settings);

export default SettingsContainer;
