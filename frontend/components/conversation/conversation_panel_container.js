import { connect } from "react-redux";

import { getCurrentUser, getConversations } from "../../reducers/selectors";
import { openSettings } from "../../actions/ui_actions";
import ConversationPanel from "./conversation_panel";
import { receiveActiveConversation } from "../../actions/conversation_actions";

const mSTP = (state) => ({
  currentUser: getCurrentUser(state),
  conversations: getConversations(state),
});

const mDTP = (dispatch) => ({
  openSettings: (settings) => dispatch(openSettings(settings)),
  setActive: (convo) => dispatch(receiveActiveConversation(convo)),
});

const ConversationPanelContainer = connect(mSTP, mDTP)(ConversationPanel);

export default ConversationPanelContainer;
