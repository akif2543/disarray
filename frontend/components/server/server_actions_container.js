import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getCurrentServer } from "../../reducers/selectors";
import ServerActions from "./server_actions";
import { closeModal } from "../../actions/ui_actions";
import { leaveServer } from "../../actions/server_actions";

const mSTP = (state, ownProps) => ({
  server: getCurrentServer(state, ownProps),
});

const mDTP = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
  leaveServer: (membership) => dispatch(leaveServer(membership)),
});

const ServerActionsContainer = withRouter(connect(mSTP, mDTP)(ServerActions));

export default ServerActionsContainer;
