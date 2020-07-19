import { combineReducers } from "redux";
import idReducer from "./id_reducer";
import infoReducer from "./info_reducer";

const sessionReducer = combineReducers({
  id: idReducer,
  info: infoReducer,
});

export default sessionReducer;
