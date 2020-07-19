import { combineReducers } from "redux";
import idReducer from "./id_reducer";
import infoReducer from "./info_reducer";
import statusReducer from "./status_reducer";

const sessionReducer = combineReducers({
  id: idReducer,
  info: infoReducer,
  status: statusReducer,
});

export default sessionReducer;
