import { connect } from "react-redux";

import { stopLoading, openModal, openSettings } from "../../actions/ui_actions";
import Home from "./home";
import {
  getCurrentUser,
  getUserFriends,
  getUserBlockedFriends,
  getUserIncomingPendingFriends,
  getUserOutgoingPendingFriends,
} from "../../reducers/selectors";
import {
  requestFriend,
  unfriend,
  respondToRequest,
} from "../../actions/friend_actions";
import {
  createConversation,
  directMessage,
} from "../../actions/conversation_actions";

const mSTP = (state, ownProps) => ({
  user: getCurrentUser(state),
  friends: getUserFriends(state),
  pendingIn: getUserIncomingPendingFriends(state),
  pendingOut: getUserOutgoingPendingFriends(state),
  blocked: getUserBlockedFriends(state),
});

const mDTP = (dispatch) => ({
  stopLoading: () => dispatch(stopLoading()),
  openSettings: (settings) => dispatch(openSettings(settings)),
  requestFriend: (id) => dispatch(requestFriend(id)),
  removeFriend: (id) => dispatch(unfriend(id)),
  createConversation: (convo) => dispatch(createConversation(convo)),
  directMessage: (id, message) => dispatch(directMessage(id, message)),
  respondToRequest: (id, type) => dispatch(respondToRequest(id, type)),
});

const HomeContainer = connect(mSTP, mDTP)(Home);

export default HomeContainer;
