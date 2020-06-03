import { connect } from "react-redux";

import { logout } from "../../actions/session_actions";
import Main from "./main";

const mSTP = (state) => ({
  currentUser: state.entities.users[state.session.id];
})

const mDTP = (dispatch) => ({
  logout: dispatch(logout())
})

const MainContainer = connect(mSTP, mDTP)(Main);

export default MainContainer;