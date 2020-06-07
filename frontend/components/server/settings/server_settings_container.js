import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { getCurrentServerJanky } from "../../../reducers/selectors";
import { closeSettings, openModal } from "../../../actions/ui_actions";
import {
  updateServer,
  deleteServer,
  requestServer,
} from "../../../actions/server_actions";
import ServerSettings from "./server_settings";

const mSTP = (state, ownProps) => ({
  server: getCurrentServerJanky(state, ownProps),
});

const mDTP = (dispatch) => ({
  closeSettings: () => dispatch(closeSettings()),
  openModal: (modal) => dispatch(openModal(modal)),
  updateServer: (server) => dispatch(updateServer(server)),
  deleteServer: (id) => dispatch(deleteServer(id)),
  requestServer: (id) => dispatch(requestServer(id)),
});

const ServerSettingsContainer = withRouter(connect(mSTP, mDTP)(ServerSettings));

export default ServerSettingsContainer;
