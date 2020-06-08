import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  getCurrentChannel,
  getCurrentChannelJanky,
} from "../../reducers/selectors";
import { closeSettings, openModal } from "../../actions/ui_actions";
import {
  updateChannel,
  deleteChannel,
  fetchChannel,
} from "../../actions/channel_actions";
import ChannelSettings from "./channel_settings";

const mSTP = (state, ownProps) => ({
  channel: getCurrentChannel(state, ownProps),
});

const mDTP = (dispatch) => ({
  closeSettings: () => dispatch(closeSettings()),
  openModal: (modal) => dispatch(openModal(modal)),
  updateChannel: (channel) => dispatch(updateChannel(channel)),
  deleteChannel: (id) => dispatch(deleteChannel(id)),
  fetchChannel: (id) => dispatch(fetchChannel(id)),
});

const ChannelSettingsContainer = withRouter(
  connect(mSTP, mDTP)(ChannelSettings)
);

export default ChannelSettingsContainer;
