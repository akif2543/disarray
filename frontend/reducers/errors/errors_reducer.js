import { combineReducers } from "redux";
import sessionErrorsReducer from "./session_errors_reducer";
import serverErrorsReducer from "./server_errors_reducer";
import channelErrorsReducer from "./channel_errors_reducer";
import conversationErrorsReducer from "./conversation_errors_reducer";
import friendsErrorsReducer from "./friends_errors_reducer";

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  server: serverErrorsReducer,
  channel: channelErrorsReducer,
  conversation: conversationErrorsReducer,
  friends: friendsErrorsReducer,
});

export default errorsReducer;
