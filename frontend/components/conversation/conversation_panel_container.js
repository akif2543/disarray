import { connect } from "react-redux";

import { getCurrentUser, getConversations } from "../../reducers/selectors";
import { openSettings } from "../../actions/ui_actions";
import ConversationPanel from "./conversation_panel";

const mSTP = (state) => ({
  currentUser: getCurrentUser(state),
  conversations: getConversations(state),
});

const mDTP = (dispatch) => ({
  openSettings: (settings) => dispatch(openSettings(settings)),
});

const ConversationPanelContainer = connect(mSTP, mDTP)(ConversationPanel);

export default ConversationPanelContainer;
