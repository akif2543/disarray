import { connect } from "react-redux";

import { loading, settings, getCurrentUser } from "../../reducers/selectors";
import Application from "./app";
import { receiveStatus } from "../../actions/session_actions";
import {
  receiveRequest,
  receiveAcceptance,
  receiveRejection,
  receiveRetraction,
  loseFriend,
} from "../../actions/friend_actions";

const mSTP = (state) => ({
  loading: loading(state),
  settings: Boolean(settings(state)),
  loggedIn: Boolean(state.session.id),
  user: getCurrentUser(state),
});

const mDTP = (dispatch) => ({
  receiveStatus: (status) => dispatch(receiveStatus(status)),
  receiveRequest: (res) => dispatch(receiveRequest(res)),
  receiveAcceptance: (res) => dispatch(receiveAcceptance(res)),
  receiveRejection: (res) => dispatch(receiveRejection(res)),
  receiveRetraction: (res) => dispatch(receiveRetraction(res)),
  loseFriend: (res) => dispatch(loseFriend(res)),
});

const AppContainer = connect(mSTP, mDTP)(Application);

export default AppContainer;
