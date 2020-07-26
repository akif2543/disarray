import { combineReducers } from "redux";
import channelSubsReducer from "./channel_subs_reducer";
import conversationSubsReducer from "./conversation_subs_reducer";
import serverSubsReducer from "./server_subs_reducer";

const subscriptionsReducer = combineReducers({
  server: serverSubsReducer,
  channel: channelSubsReducer,
  conversation: conversationSubsReducer,
});

export default subscriptionsReducer;
