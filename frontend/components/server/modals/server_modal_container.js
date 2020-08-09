import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  createServer,
  joinServer,
  clearServerErrors,
} from "../../../actions/server_actions";
import { closeModal, openModal } from "../../../actions/ui_actions";
import ServerModal from "./server_modal";
import { getCurrentUser } from "../../../reducers/selectors";

const mSTP = (state) => ({
  currentUser: getCurrentUser(state),
  errors: state.errors.server,
});

const mDTP = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
  openModal: (modal) => dispatch(openModal(modal)),
  createServer: (server, push) => dispatch(createServer(server, push)),
  joinServer: (membership, push) => dispatch(joinServer(membership, push)),
  clearServerErrors: () => dispatch(clearServerErrors()),
});

const ServerModalContainer = withRouter(connect(mSTP, mDTP)(ServerModal));

export default ServerModalContainer;
