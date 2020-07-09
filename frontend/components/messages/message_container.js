import { connect } from "react-redux";

import { updateMessage, deleteMessage } from "../../actions/message_actions";
import { getMessageAuthor, getCurrentUser } from "../../reducers/selectors";
import Message from "./message";
import { openModal } from "../../actions/ui_actions";

const mSTP = (state, ownProps) => ({
  a: getMessageAuthor(state, ownProps),
  u: getCurrentUser(state),
});

const mDTP = (dispatch) => ({
  updateMessage: (message) => dispatch(updateMessage(message)),
  deleteMessage: (id) => dispatch(deleteMessage(id)),
  openModal: (modal) => dispatch(openModal(modal)),
});

const MessageContainer = connect(mSTP, mDTP)(Message);

export default MessageContainer;
