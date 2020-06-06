import { connect } from "react-redux";

import { logout } from "../../actions/session_actions";
import { stopLoading, openModal } from "../../actions/ui_actions";
import Main from "./main";
import {
  getCurrentUser,
  getUserServers,
  getCurrentServer,
  getServerMembers,
} from "../../reducers/selectors";
import {
  requestServer,
  requestServers,
  createServer,
  updateServer,
  deleteServer,
} from "../../actions/server_actions";

const mSTP = (state, ownProps) => ({
  currentUser: getCurrentUser(state),
  // servers: getUserServers(state),
  // modalOpen: Boolean(state.ui.modal),
  // currentServer: getCurrentServer(state, ownProps.match.params.serverId),
  // members: getServerMembers(state, ownProps.match.params.serverId),
});

const mDTP = (dispatch) => ({
  stopLoading: () => dispatch(stopLoading()),
  // requestServers: () => dispatch(requestServers()),
  // requestServer: (id) => dispatch(requestServer(id)),
  // createServer: (server) => dispatch(createServer(server)),
  // updateServer: (server) => dispatch(updateServer(server)),
  // deleteServer: (id) => dispatch(deleteServer(id)),
  logout: () => dispatch(logout()),
  // openModal: (modal) => dispatch(openModal(modal)),
});

const MainContainer = connect(mSTP, mDTP)(Main);

export default MainContainer;
