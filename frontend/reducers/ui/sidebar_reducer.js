import { SHOW_SIDEBAR, HIDE_SIDEBAR } from "../../actions/ui_actions";

const sidebarReducer = (state = true, action) => {
  switch (action.type) {
    case SHOW_SIDEBAR:
      return true;
    case HIDE_SIDEBAR:
      return false;
    default:
      return state;
  }
};

export default sidebarReducer;
