import { connect } from "react-redux";

import {
  getCurrentUser,
  getCurrentConversation,
  getConversationMessages,
  getConversationMembers,
  getConversationName,
  getSubscription,
} from "../../reducers/selectors";
import {
  fetchConversation,
  customizeConversation,
  receiveActiveConversation,
} from "../../actions/conversation_actions";
import {
  receiveMessage,
  removeMessage,
  fetchMessages,
  updateMessage,
  deleteMessage,
} from "../../actions/message_actions";
import { showSidebar, hideSidebar } from "../../actions/ui_actions";
import Conversation from "./conversation";
import { unblock } from "../../actions/friend_actions";

const mSTP = (state, ownProps) => ({
  currentUser: getCurrentUser(state),
  conversation: getCurrentConversation(state, ownProps),
  name: getConversationName(state, ownProps),
  members: getConversationMembers(state, ownProps),
  messages: getConversationMessages(state, ownProps),
  sub: getSubscription(state, ownProps),
  sidebarOpen: state.ui.sidebar,
});

const mDTP = (dispatch) => ({
  fetchConversation: (id) => dispatch(fetchConversation(id)),
  receiveMessage: (message) => dispatch(receiveMessage(message)),
  updateMessage: (message) => dispatch(updateMessage(message)),
  deleteMessage: (id) => dispatch(deleteMessage(id)),
  fetchMessages: (type, id, time) => dispatch(fetchMessages(type, id, time)),
  showSidebar: () => dispatch(showSidebar()),
  hideSidebar: () => dispatch(hideSidebar()),
  removeMessage: (message) => dispatch(removeMessage(message)),
  setActive: (id) => dispatch(receiveActiveConversation(id)),
  unblock: (id) => () => dispatch(unblock(id)),
  customizeConversation: (id, conversation) =>
    dispatch(customizeConversation(id, conversation)),
});

const ConversationContainer = connect(mSTP, mDTP)(Conversation);

export default ConversationContainer;
