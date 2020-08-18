import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { deleteMessage } from "../../actions/message_actions";
import { closeModal } from "../../actions/ui_actions";
import {
  getCurrentUser,
  getAuthorFromMessage,
  getMessage,
} from "../../reducers/selectors";
import MessageModal from "./message_modal";

const mSTP = (state, ownProps) => ({
  u: getCurrentUser(state),
  m: getMessage(state, ownProps),
  a: getAuthorFromMessage(state, ownProps),
});

const mDTP = (dispatch) => ({
  closeModal: () => dispatch(closeModal()),
  deleteMessage: (id) => dispatch(deleteMessage(id)),
});

const MessageModalContainer = withRouter(connect(mSTP, mDTP)(MessageModal));

export default MessageModalContainer;
