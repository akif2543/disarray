import { OPEN_MODAL, CLOSE_MODAL } from "../../actions/ui_actions";
import { RECEIVE_SERVER } from "../../actions/server_actions";

const modalReducer = (state = null, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return action.modal;
    case CLOSE_MODAL:
      return null;
    case RECEIVE_SERVER:
      return null;
    default:
      return state;
  }
};

export default modalReducer;
