import { connect } from "react-redux";

import {
  getCurrentServerJanky,
  getCurrentUser,
  getCurrentChannelJanky,
  getServerMembers,
  getCurrentChannel,
} from "../../reducers/selectors";
import { fetchChannel } from "../../actions/channel_actions";
import TextChannel from "./text_channel";

const mSTP = (state, ownProps) => {
  return {
    currentUser: getCurrentUser(state),
    server: getCurrentServerJanky(state, ownProps),
    channel: getCurrentChannel(state, ownProps),
    // channel: getCurrentChannelJanky(state, ownProps),
    members: getServerMembers(state, ownProps),
  };
};

const mDTP = (dispatch) => ({
  fetchChannel: (id) => dispatch(fetchChannel),
});

const TextChannelContainer = connect(mSTP, mDTP)(TextChannel);

export default TextChannelContainer;
