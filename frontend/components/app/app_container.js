import { connect } from "react-redux";

import { loading, settings, getCurrentUser } from "../../reducers/selectors";
import Application from "./app";
import { receiveStatus } from "../../actions/session_actions";

const mSTP = (state) => ({
  loading: loading(state),
  settings: Boolean(settings(state)),
  loggedIn: Boolean(state.session.id),
  user: getCurrentUser(state),
});

const mDTP = (dispatch) => ({
  receiveStatus: (status) => dispatch(receiveStatus(status)),
});

const AppContainer = connect(mSTP, mDTP)(Application);

export default AppContainer;
