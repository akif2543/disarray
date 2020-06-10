import { connect } from "react-redux";

import {
  getCurrentServer,
  getServerMembers,
  getCurrentUser,
  getServerChannels,
} from "../../../reducers/selectors";
import {
  requestServer,
  updateServer,
  deleteServer,
  leaveServer,
} from "../../../actions/server_actions";
import Server from "./server";
import { logout } from "../../../actions/session_actions";
import {
  openModal,
  openSettings,
  closeSettings,
} from "../../../actions/ui_actions";

const mSTP = (state, ownProps) => ({
  currentUser: getCurrentUser(state),
  server: getCurrentServer(state, ownProps),
  channels: getServerChannels(state, ownProps),
  members: getServerMembers(state, ownProps),
  sidebarOpen: state.ui.sidebar,
});

const mDTP = (dispatch) => ({
  requestServer: (id) => dispatch(requestServer(id)),
  updateServer: (server) => dispatch(updateServer(server)),
  deleteServer: (id) => dispatch(deleteServer(id)),
  leaveServer: (id) => dispatch(leaveServer(id)),
  logout: () => dispatch(logout()),
  openModal: (modal) => dispatch(openModal(modal)),
  openSettings: (settings) => dispatch(openSettings(settings)),
  closeSettings: () => dispatch(closeSettings()),
});

const ServerContainer = connect(mSTP, mDTP)(Server);

export default ServerContainer;