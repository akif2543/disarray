import { connect } from "react-redux";

import {
  getCurrentUser,
  getCurrentConversation,
  getConversationMessages,
  getConversationMembers,
  getOtherUser,
} from "../../reducers/selectors";
import { fetchConversation } from "../../actions/conversation_actions";
import { receiveMessage, fetchMessages } from "../../actions/message_actions";
import { showSidebar, hideSidebar } from "../../actions/ui_actions";
import Conversation from "./conversation";

const mSTP = (state, ownProps) => ({
  currentUser: getCurrentUser(state),
  conversation: getCurrentConversation(state, ownProps),
  // members: getConversationMembers(state, ownProps),
  otherUser: getOtherUser(state, ownProps),
  messages: getConversationMessages(state, ownProps),
  sidebarOpen: state.ui.sidebar,
});

const mDTP = (dispatch) => ({
  fetchConversation: (id) => dispatch(fetchConversation(id)),
  receiveMessage: (message) => dispatch(receiveMessage(message)),
  fetchMessages: (type, id, time) => dispatch(fetchMessages(type, id, time)),
  showSidebar: () => dispatch(showSidebar()),
  hideSidebar: () => dispatch(hideSidebar()),
});

const ConversationContainer = connect(mSTP, mDTP)(Conversation);

export default ConversationContainer;
