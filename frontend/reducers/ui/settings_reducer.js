import { OPEN_SETTINGS, CLOSE_SETTINGS } from "../../actions/ui_actions";
import { LOGOUT_CURRENT_USER } from "../../actions/session_actions";

const settingsReducer = (state = null, action) => {
  switch (action.type) {
    case OPEN_SETTINGS:
      return action.settings;
    case CLOSE_SETTINGS:
      return null;
    case LOGOUT_CURRENT_USER:
      return null;
    default:
      return state;
  }
};

export default settingsReducer;
