import { connect } from "react-redux";

import { login } from "../../actions/session_actions";
import { startLoading } from "../../actions/ui_actions";

import Splash from "./splash";
import { loading } from "../../reducers/selectors";

const mSTP = (state) => ({
  loggedIn: Boolean(state.session.id),
  loading: loading(state),
});

const mDTP = (dispatch) => ({
  login: (user) => dispatch(login(user)),
  startLoading: () => dispatch(startLoading()),
});

const SplashContainer = connect(mSTP, mDTP)(Splash);

export default SplashContainer;
