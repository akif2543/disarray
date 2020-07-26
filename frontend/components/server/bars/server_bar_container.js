import { connect } from "react-redux";

import {
  // getCurrentServer,
  // getServerMembers,
  getUserServers,
} from "../../../reducers/selectors";
import {
  //   requestServer,
  //   updateServer,
  //   deleteServer,
  leaveServer,
} from "../../../actions/server_actions";
import ServerBar from "./server_bar";
import { openModal } from "../../../actions/ui_actions";

const mSTP = (state) => ({
  servers: getUserServers(state),
  modalOpen: state.ui.modal === "portal",
  active: state.session.active,
});

const mDTP = (dispatch) => ({
  openModal: (modal) => dispatch(openModal(modal)),
  // requestServer: (id) => dispatch(requestServer(id)),
  // updateServer: (server) => dispatch(updateServer(server)),
  // deleteServer: (id) => dispatch(deleteServer(id)),
  leaveServer: (id) => dispatch(leaveServer(id)),
});

const ServerBarContainer = connect(mSTP, mDTP)(ServerBar);

export default ServerBarContainer;
