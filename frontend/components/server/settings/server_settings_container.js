import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { getCurrentServer, restricted } from "../../../reducers/selectors";
import { closeSettings, openModal } from "../../../actions/ui_actions";
import {
  updateServer,
  deleteServer,
  requestServer,
} from "../../../actions/server_actions";
import ServerSettings from "./server_settings";

const mSTP = (state, ownProps) => ({
  server: getCurrentServer(state, ownProps),
  notAllowed: restricted(state, ownProps),
});

const mDTP = (dispatch) => ({
  closeSettings: () => dispatch(closeSettings()),
  openModal: (modal) => () => dispatch(openModal(modal)),
  updateServer: (id, server) => dispatch(updateServer(id, server)),
  deleteServer: (id) => dispatch(deleteServer(id)),
  requestServer: (id) => dispatch(requestServer(id)),
});

const ServerSettingsContainer = withRouter(connect(mSTP, mDTP)(ServerSettings));

export default ServerSettingsContainer;
