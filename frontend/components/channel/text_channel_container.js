import { connect } from "react-redux";

import {
  getCurrentServer,
  getCurrentUser,
  getServerMembers,
  getCurrentChannel,
  getTextChannelMessages,
} from "../../reducers/selectors";
import { fetchChannel } from "../../actions/channel_actions";
import TextChannel from "./text_channel";

const mSTP = (state, ownProps) => {
  return {
    currentUser: getCurrentUser(state),
    server: getCurrentServer(state, ownProps),
    channel: getCurrentChannel(state, ownProps),
    members: getServerMembers(state, ownProps),
    messages: getTextChannelMessages(state, ownProps),
  };
};

const mDTP = (dispatch) => ({
  fetchChannel: (id) => dispatch(fetchChannel(id)),
});

const TextChannelContainer = connect(mSTP, mDTP)(TextChannel);

export default TextChannelContainer;
