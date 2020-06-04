import { combineReducers } from "redux";
import loadingReducer from "./loading_reducer";
import modalReducer from "./modal_reducer";

const uiReducer = combineReducers({
  loading: loadingReducer,
  modal: modalReducer,
});

export default uiReducer;
