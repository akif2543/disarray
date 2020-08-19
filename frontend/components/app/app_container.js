import { connect } from "react-redux";

import {
  loading,
  settings,
  getCurrentUser,
  getUserServers,
  getConversationIds,
} from "../../reducers/selectors";
import { receiveStatus } from "../../actions/session_actions";
import {
  receiveRequest,
  receiveAcceptance,
  receiveRejection,
  receiveRetraction,
  loseFriend,
  receiveBlock,
  receiveUnblock,
} from "../../actions/friend_actions";
import {
  receiveServer,
  removeServer,
  receiveAlias,
  removeMember,
} from "../../actions/server_actions";
import { receiveChannel, removeChannel } from "../../actions/channel_actions";
import {
  receiveMessage,
  removeMessage,
  receiveSub,
  receiveUnread,
} from "../../actions/message_actions";
import {
  receiveConversation,
  removeConversationMember,
} from "../../actions/conversation_actions";
import Application from "./app";

const mSTP = (state) => ({
  loading: loading(state),
  settings: Boolean(settings(state)),
  loggedIn: Boolean(state.session.id),
  user: getCurrentUser(state),
  modal: state.ui.modal.name,
  servers: getUserServers(state),
  convos: getConversationIds(state),
});

const mDTP = (dispatch) => ({
  receiveStatus: (status) => dispatch(receiveStatus(status)),
  receiveSub: (sub) => dispatch(receiveSub(sub)),
  receiveConversation: (convo) => dispatch(receiveConversation(convo)),
  removeCM: (mem) => dispatch(removeConversationMember(mem)),
  friendActions: {
    receiveRequest: (res) => dispatch(receiveRequest(res)),
    receiveAcceptance: (res) => dispatch(receiveAcceptance(res)),
    receiveRejection: (res) => dispatch(receiveRejection(res)),
    receiveRetraction: (res) => dispatch(receiveRetraction(res)),
    loseFriend: (res) => dispatch(loseFriend(res)),
    receiveBlock: (res) => dispatch(receiveBlock(res)),
    receiveUnblock: (res) => dispatch(receiveUnblock(res)),
  },
  serverActions: {
    receiveServer: (server) => dispatch(receiveServer(server)),
    removeServer: (server) => dispatch(removeServer(server)),
    receiveAlias: (alias) => dispatch(receiveAlias(alias)),
    removeMember: (member) => dispatch(removeMember(member)),
    receiveChannel: (channel) => dispatch(receiveChannel(channel)),
    removeChannel: (channel) => dispatch(removeChannel(channel)),
  },
  messageActions: {
    receiveMessage: (message) => dispatch(receiveMessage(message)),
    removeMessage: (message) => dispatch(removeMessage(message)),
    receiveUnread: (unread) => dispatch(receiveUnread(unread)),
  },
});

const AppContainer = connect(mSTP, mDTP)(Application);

export default AppContainer;
