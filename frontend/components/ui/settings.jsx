import React from "react";
import { connect } from "react-redux";

import { settings } from "../../reducers/selectors";
import UserSettingsContainer from "../user/user_settings_container";
import ServerSettingsContainer from "../server/settings/server_settings_container";
import ChannelSettingsContainer from "../channel/channel_settings_container";

const Settings = ({ settings }) => {
  if (!settings) return null;

  let component;

  switch (settings) {
    case "user":
      component = <UserSettingsContainer />;
      break;
    case "server":
      component = <ServerSettingsContainer />;
      break;
    case "channel":
      component = <ChannelSettingsContainer />;
      break;
    default:
      return null;
  }

  return <div className="settings">{component}</div>;
};

const mSTP = (state) => ({
  settings: settings(state),
});

const SettingsContainer = connect(mSTP)(Settings);

export default SettingsContainer;
