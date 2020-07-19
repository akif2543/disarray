import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { updateMessage } from "../../actions/message_actions";
import {
  getMessageAuthor,
  getCurrentUser,
  getCurrentServer,
} from "../../reducers/selectors";
import Message from "./message";
import { openModal } from "../../actions/ui_actions";

const mSTP = (state, ownProps) => ({
  a: getMessageAuthor(state, ownProps),
  u: getCurrentUser(state),
  s: getCurrentServer(state, ownProps),
});

const mDTP = (dispatch) => ({
  updateMessage: (message) => dispatch(updateMessage(message)),
  openModal: (modal) => dispatch(openModal(modal)),
});

const MessageContainer = connect(mSTP, mDTP)(Message);

export default withRouter(MessageContainer);
