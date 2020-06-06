import { connect } from "react-redux";

import {
  getCurrentServer,
  getServerMembers,
  getCurrentUser,
} from "../../reducers/selectors";
import {
  requestServer,
  updateServer,
  deleteServer,
  leaveServer,
} from "../../actions/server_actions";
import Server from "./server";
import { logout } from "../../actions/session_actions";
import { openModal } from "../../actions/ui_actions";

const mSTP = (state, ownProps) => ({
  currentUser: getCurrentUser(state),
  server: getCurrentServer(state, ownProps),
  // members: getServerMembers(state, ownProps),
});

const mDTP = (dispatch) => ({
  requestServer: (id) => dispatch(requestServer(id)),
  updateServer: (server) => dispatch(updateServer(server)),
  deleteServer: (id) => dispatch(deleteServer(id)),
  leaveServer: (id) => dispatch(leaveServer(id)),
  logout: () => dispatch(logout()),
  openModal: (modal) => dispatch(openModal(modal)),
});

const ServerContainer = connect(mSTP, mDTP)(Server);

export default ServerContainer;
