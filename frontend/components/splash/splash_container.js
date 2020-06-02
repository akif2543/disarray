import { connect } from "react-redux";

import Splash from "./splash";

const mSTP = (state) => ({
  loggedIn: Boolean(state.session.id),
});

const SplashContainer = connect(mSTP)(Splash);

export default SplashContainer;
