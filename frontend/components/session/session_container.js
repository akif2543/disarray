import { connect } from "react-redux";
import {
  login,
  register,
  clearSessionErrors,
} from "../../actions/session_actions";
import Session from "./session";
import { loading } from "../../reducers/selectors";
import { startLoading } from "../../actions/ui_actions";

const mSTP = (state) => ({
  errors: state.errors.session,
  loggedIn: Boolean(state.session.id),
  loading: loading(state),
});

const mDTP = (dispatch) => ({
  login: (user) => dispatch(login(user)),
  register: (user) => dispatch(register(user)),
  clearErrors: () => dispatch(clearSessionErrors()),
  startLoading: () => dispatch(startLoading()),
});

const SessionContainer = connect(mSTP, mDTP)(Session);

export default SessionContainer;
