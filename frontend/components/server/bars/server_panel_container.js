import { withRouter } from "react-router-dom";
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
  receiveActive,
} from "../../../actions/server_actions";
import { logout } from "../../../actions/session_actions";
import {
  openModal,
  openSettings,
  closeSettings,
} from "../../../actions/ui_actions";
import ServerPanel from "./server_panel";
import { fetchChannel } from "../../../actions/channel_actions";

const mSTP = (state, ownProps) => ({
  currentUser: getCurrentUser(state),
  server: getCurrentServer(state, ownProps),
  channels: getServerChannels(state, ownProps),
  members: getServerMembers(state, ownProps),
  sidebarOpen: state.ui.sidebar,
});

const mDTP = (dispatch) => ({
  fetchServer: (id) => dispatch(requestServer(id)),
  fetchChannel: (id) => dispatch(fetchChannel(id)),
  updateServer: (server) => dispatch(updateServer(server)),
  deleteServer: (id) => dispatch(deleteServer(id)),
  leaveServer: (id) => dispatch(leaveServer(id)),
  logout: () => dispatch(logout()),
  openModal: (modal) => dispatch(openModal(modal)),
  openSettings: (settings) => dispatch(openSettings(settings)),
  closeSettings: () => dispatch(closeSettings()),
  setActive: (server) => dispatch(receiveActive(server)),
});

const ServerPanelContainer = withRouter(connect(mSTP, mDTP)(ServerPanel));

export default ServerPanelContainer;
