import { connect } from "react-redux";
import {
  login,
  register,
  clearSessionErrors,
} from "../../actions/session_actions";
import Session from "./session";

const mSTP = (state) => ({
  errors: state.errors.session,
});

const mDTP = (dispatch) => ({
  login: (user) => dispatch(login(user)),
  register: (user) => dispatch(register(user)),
  clearErrors: () => dispatch(clearSessionErrors()),
});

const SessionContainer = connect(mSTP, mDTP)(Session);

export default SessionContainer;
