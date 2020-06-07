import React from "react";
import { connect } from "react-redux";

import { settings } from "../../reducers/selectors";
import UserSettingsContainer from "../user/user_settings_container";

const Settings = ({ settings }) => {
  if (!settings) return null;

  let component;

  switch (settings) {
    case "user":
      component = <UserSettingsContainer />;
      break;
    case "server":
      component = this;
      break;
    case "leave":
      component = this;
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
