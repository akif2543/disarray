import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  getUserServers,
  unreadConversations,
  getCurrentUser,
} from "../../../reducers/selectors";
import { leaveServer } from "../../../actions/server_actions";
import ServerBar from "./server_bar";
import { openModal } from "../../../actions/ui_actions";

const mSTP = (state) => ({
  servers: getUserServers(state),
  modalOpen: state.ui.modal.name === "portal",
  active: state.session.active,
  pending: state.session.pendingIn.length,
  unreads: unreadConversations(state),
  currentUser: getCurrentUser(state),
});

const mDTP = (dispatch) => ({
  openModal: (modal) => () => dispatch(openModal(modal)),
  leaveServer: (id) => dispatch(leaveServer(id)),
});

const ServerBarContainer = withRouter(connect(mSTP, mDTP)(ServerBar));

export default ServerBarContainer;
