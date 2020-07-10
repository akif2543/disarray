import { connect } from "react-redux";

import {
  getCurrentServer,
  getCurrentUser,
  getServerMembers,
  getCurrentChannel,
  getTextChannelMessages,
} from "../../reducers/selectors";
import { fetchChannel } from "../../actions/channel_actions";
import TextChannel from "./text_channel";
import {
  receiveMessage,
  removeMessage,
  fetchMessages,
  updateMessage,
  deleteMessage,
} from "../../actions/message_actions";
import { showSidebar, hideSidebar } from "../../actions/ui_actions";

const mSTP = (state, ownProps) => ({
  currentUser: getCurrentUser(state),
  server: getCurrentServer(state, ownProps),
  channel: getCurrentChannel(state, ownProps),
  members: getServerMembers(state, ownProps),
  messages: getTextChannelMessages(state, ownProps),
  sidebarOpen: state.ui.sidebar,
});

const mDTP = (dispatch) => ({
  fetchChannel: (id) => dispatch(fetchChannel(id)),
  receiveMessage: (message) => dispatch(receiveMessage(message)),
  showSidebar: () => dispatch(showSidebar()),
  hideSidebar: () => dispatch(hideSidebar()),
  fetchMessages: (type, id, time) => dispatch(fetchMessages(type, id, time)),
  updateMessage: (message) => dispatch(updateMessage(message)),
  deleteMessage: (id) => dispatch(deleteMessage(id)),
  removeMessage: (message) => dispatch(removeMessage(message)),
});

const TextChannelContainer = connect(mSTP, mDTP)(TextChannel);

export default TextChannelContainer;
