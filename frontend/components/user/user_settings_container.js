import { connect } from "react-redux";

import { getCurrentUser } from "../../reducers/selectors";
import {
  closeSettings,
  startLoading,
  openModal,
} from "../../actions/ui_actions";
import {
  logout,
  updateUser,
  deleteUser,
  fetchCurrentUser,
  clearSessionErrors,
} from "../../actions/session_actions";
import UserSettings from "./user_settings";

const mSTP = (state) => ({
  currentUser: getCurrentUser(state),
  serverErrors: state.errors.session,
});

const mDTP = (dispatch) => ({
  closeSettings: () => dispatch(closeSettings()),
  logout: () => dispatch(logout()),
  fetchCurrentUser: (id) => dispatch(fetchCurrentUser(id)),
  updateUser: (id, user) => dispatch(updateUser(id, user)),
  openModal: (modal) => dispatch(openModal(modal)),
  startLoading: () => dispatch(startLoading()),
  clearErrors: () => dispatch(clearSessionErrors()),
});

const UserSettingsContainer = connect(mSTP, mDTP)(UserSettings);

export default UserSettingsContainer;
