import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { getCurrentUser, getConversations } from "../../reducers/selectors";
import { openSettings } from "../../actions/ui_actions";
import ConversationPanel from "./conversation_panel";
import {
  receiveActiveConversation,
  closeConversation,
} from "../../actions/conversation_actions";

const mSTP = (state) => ({
  currentUser: getCurrentUser(state),
  conversations: getConversations(state),
  pending: state.session.pendingIn.length,
});

const mDTP = (dispatch) => ({
  openSettings: (settings) => dispatch(openSettings(settings)),
  setActive: (convo) => dispatch(receiveActiveConversation(convo)),
  close: (id, push) => dispatch(closeConversation(id, push)),
});

const ConversationPanelContainer = withRouter(
  connect(mSTP, mDTP)(ConversationPanel)
);

export default ConversationPanelContainer;
