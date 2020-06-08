import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  getCurrentServerJanky,
  getCurrentServer,
} from "../../../reducers/selectors";
import ServerActions from "./server_actions";
import { closeModal, closeSettings } from "../../../actions/ui_actions";
import { leaveServer, deleteServer } from "../../../actions/server_actions";
import { createChannel } from "../../../actions/channel_actions";

const mSTP = (state, ownProps) => ({
  server: getCurrentServerJanky(state, ownProps),
});

const mDTP = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
  closeSettings: () => dispatch(closeSettings()),
  leaveServer: (membership) => dispatch(leaveServer(membership)),
  deleteServer: (id) => dispatch(deleteServer(id)),
  createChannel: (channel) => dispatch(createChannel(channel)),
});

const ServerActionsContainer = withRouter(connect(mSTP, mDTP)(ServerActions));

export default ServerActionsContainer;
