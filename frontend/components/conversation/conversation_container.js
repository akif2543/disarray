import { connect } from "react-redux";

import {
  getCurrentUser,
  getCurrentConversation,
  getConversationMessages,
  getConversationMembers,
  getConversationName,
} from "../../reducers/selectors";
import {
  fetchConversation,
  fetchConversations,
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

const mSTP = (state, ownProps) => ({
  currentUser: getCurrentUser(state),
  conversation: getCurrentConversation(state, ownProps),
  name: getConversationName(state, ownProps),
  members: getConversationMembers(state, ownProps),
  messages: getConversationMessages(state, ownProps),
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
});

const ConversationContainer = connect(mSTP, mDTP)(Conversation);

export default ConversationContainer;
