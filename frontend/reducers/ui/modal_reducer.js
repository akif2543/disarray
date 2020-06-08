import { OPEN_MODAL, CLOSE_MODAL } from "../../actions/ui_actions";
import { RECEIVE_SERVER } from "../../actions/server_actions";
import { LOGOUT_CURRENT_USER } from "../../actions/session_actions";
import { RECEIVE_CHANNEL } from "../../actions/channel_actions";

const modalReducer = (state = null, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return action.modal;
    case CLOSE_MODAL:
      return null;
    case RECEIVE_SERVER:
      return null;
    case RECEIVE_CHANNEL:
      return null;
    case LOGOUT_CURRENT_USER:
      return null;
    default:
      return state;
  }
};

export default modalReducer;
