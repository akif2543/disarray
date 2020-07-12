import { connect } from "react-redux";

import { stopLoading, openModal, openSettings } from "../../actions/ui_actions";
import Home from "./home";
import { getCurrentUser } from "../../reducers/selectors";

const mSTP = (state, ownProps) => ({
  currentUser: getCurrentUser(state),
});

const mDTP = (dispatch) => ({
  stopLoading: () => dispatch(stopLoading()),
  openSettings: (settings) => dispatch(openSettings(settings)),
});

const HomeContainer = connect(mSTP, mDTP)(Home);

export default HomeContainer;
