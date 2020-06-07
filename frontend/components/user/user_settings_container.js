import { connect } from "react-redux";

import { getCurrentUser } from "../../reducers/selectors";
import { closeSettings } from "../../actions/ui_actions";
import { logout, updateUser, deleteUser } from "../../actions/session_actions";
import UserSettings from "./user_settings";

const mSTP = (state) => ({
  currentUser: getCurrentUser(state),
});

const mDTP = (dispatch) => ({
  closeSettings: () => dispatch(closeSettings()),
  logout: () => dispatch(logout()),
  updateUser: (user) => dispatch(updateUser(user)),
  deleteUser: (id) => dispatch(deleteUser(id)),
});

const UserSettingsContainer = connect(mSTP, mDTP)(UserSettings);

export default UserSettingsContainer;
