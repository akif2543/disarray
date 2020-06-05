import { connect } from "react-redux";

import { createServer, joinServer } from "../../actions/server_actions";
import { closeModal } from "../../actions/ui_actions";
import ServerModal from "./server_modal";
import { getCurrentUser } from "../../reducers/selectors";

const mSTP = (state) => ({
  currentUser: getCurrentUser(state),
  errors: state.errors.server,
});

const mDTP = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
  createServer: (server) => dispatch(createServer(server)),
  joinServer: (membership) => dispatch(joinServer(membership)),
});

const ServerModalContainer = connect(mSTP, mDTP)(ServerModal);

export default ServerModalContainer;
