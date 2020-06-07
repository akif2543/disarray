import { connect } from "react-redux";

import {
  createServer,
  joinServer,
  clearServerErrors,
} from "../../../actions/server_actions";
import { closeModal } from "../../../actions/ui_actions";
import ServerModal from "./server_modal";
import { getCurrentUser } from "../../../reducers/selectors";

const mSTP = (state) => ({
  currentUser: getCurrentUser(state),
  errors: state.errors.server,
});

const mDTP = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
  createServer: (server) => dispatch(createServer(server)),
  joinServer: (membership) => dispatch(joinServer(membership)),
  clearServerErrors: () => dispatch(clearServerErrors()),
});

const ServerModalContainer = connect(mSTP, mDTP)(ServerModal);

export default ServerModalContainer;
