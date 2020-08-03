import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  // getCurrentServer,
  // getServerMembers,
  getUserServers,
  unreadConversations,
  getCurrentUser,
} from "../../../reducers/selectors";
import {
  //   requestServer,
  //   updateServer,
  //   deleteServer,
  leaveServer,
} from "../../../actions/server_actions";
import { receiveActiveConversation } from "../../../actions/conversation_actions";
import ServerBar from "./server_bar";
import { openModal } from "../../../actions/ui_actions";

const mSTP = (state) => ({
  servers: getUserServers(state),
  modalOpen: state.ui.modal === "portal",
  active: state.session.active,
  pending: state.session.pendingIn.length,
  unreads: unreadConversations(state),
  currentUser: getCurrentUser(state),
});

const mDTP = (dispatch) => ({
  openModal: (modal) => dispatch(openModal(modal)),
  // requestServer: (id) => dispatch(requestServer(id)),
  // updateServer: (server) => dispatch(updateServer(server)),
  // deleteServer: (id) => dispatch(deleteServer(id)),
  leaveServer: (id) => dispatch(leaveServer(id)),
  setActive: (id) => dispatch(receiveActiveConversation(id)),
});

const ServerBarContainer = withRouter(connect(mSTP, mDTP)(ServerBar));

export default ServerBarContainer;
