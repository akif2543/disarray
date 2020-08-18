import { OPEN_MODAL, CLOSE_MODAL } from "../../actions/ui_actions";
import { RECEIVE_SERVER } from "../../actions/server_actions";
import { LOGOUT_CURRENT_USER } from "../../actions/session_actions";
import { RECEIVE_CHANNEL } from "../../actions/channel_actions";

const modalReducer = (state = {}, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return action.modal;
    case CLOSE_MODAL:
      return {};
    case RECEIVE_SERVER:
      return {};
    case RECEIVE_CHANNEL:
      return {};
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
};

export default modalReducer;
