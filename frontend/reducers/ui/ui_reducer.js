import { combineReducers } from "redux";
import loadingReducer from "./loading_reducer";
import modalReducer from "./modal_reducer";
import settingsReducer from "./settings_reducer";
import sidebarReducer from "./sidebar_reducer";

const uiReducer = combineReducers({
  loading: loadingReducer,
  modal: modalReducer,
  settings: settingsReducer,
  sidebar: sidebarReducer,
});

export default uiReducer;
