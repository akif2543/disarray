import { connect } from "react-redux";

import { getCurrentUser } from "../../reducers/selectors";
import { createServer, joinServer } from "../../actions/server_actions";
import { closeModal } from "../../actions/ui_actions";
import ServerModal from "./server_modal";

const mSTP = (state) => ({
  currentUser: getCurrentUser(state),
});

const mDTP = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
  createServer: (server) => dispatch(createServer(server)),
  joinServer: (membership) => dispatch(joinServer(membership)),
});

const ServerModalContainer = connect(mSTP, mDTP)(ServerModal);

export default ServerModalContainer;
