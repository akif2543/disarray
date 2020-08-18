import { OPEN_SETTINGS, CLOSE_SETTINGS } from "../../actions/ui_actions";
import { LOGOUT_CURRENT_USER } from "../../actions/session_actions";
import { REMOVE_SERVER } from "../../actions/server_actions";

const settingsReducer = (state = {}, action) => {
  switch (action.type) {
    case OPEN_SETTINGS:
      return action.settings;
    case CLOSE_SETTINGS:
      return {};
    case LOGOUT_CURRENT_USER:
      return {};
    case REMOVE_SERVER:
      return {};
    default:
      return state;
  }
};

export default settingsReducer;
