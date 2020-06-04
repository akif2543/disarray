import { getCurrentUser } from "../../reducers/selectors";
import { createServer, joinServer } from "../../actions/server_actions";
import { connect } from "react-redux";
import ServerPortal from "./server_portal";
import { closeModal } from "../../actions/ui_actions";

const mSTP = (state) => ({
  currentUser: getCurrentUser(state),
});

const mDTP = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
  createServer: (server) => dispatch(createServer(server)),
  joinServer: (membership) => dispatch(joinServer(membership)),
});

const ServerPortalContainer = connect(mSTP, mDTP)(ServerPortal);

export default ServerPortalContainer;
