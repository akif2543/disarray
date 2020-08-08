import { combineReducers } from "redux";
import channelSubsReducer from "./channel_subs_reducer";
import conversationSubsReducer from "./conversation_subs_reducer";
import serverSubsReducer from "./server_subs_reducer";
import appearanceSubReducer from "./appearance_sub_reducer";
import friendsSubReducer from "./friends_sub_reducer";
import conversationChannelSubReducer from "./conversation_channel_sub_reducer";

const subscriptionsReducer = combineReducers({
  appearance: appearanceSubReducer,
  friends: friendsSubReducer,
  conversationChannel: conversationChannelSubReducer,
  server: serverSubsReducer,
  channel: channelSubsReducer,
  conversation: conversationSubsReducer,
});

export default subscriptionsReducer;
