import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import UserSettingsSidebar from "./user_settings_sidebar";
import UserEditForm from "./user_edit_form";

class UserSettings extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    const {
      currentUser: { id },
      fetchCurrentUser,
    } = this.props;
    fetchCurrentUser(id);
  }

  handleLogout() {
    const { logout, startLoading } = this.props;
    logout();
    startLoading();
  }

  render() {
    const {
      closeSettings,
      currentUser,
      updateUser,
      openModal,
      serverErrors,
      clearErrors,
    } = this.props;

    return (
      <div className="settings">
        <UserSettingsSidebar logout={this.handleLogout} />
        <main>
          <header>
            <h2>MY ACCOUNT</h2>
            <div>
              <button type="button" onClick={closeSettings}>
                <FontAwesomeIcon icon={["far", "times-circle"]} size="2x" />
              </button>
              <h4>ESC</h4>
            </div>
          </header>
          <UserEditForm
            updateUser={updateUser}
            currentUser={currentUser}
            serverErrors={serverErrors}
            clearErrors={clearErrors}
            openModal={openModal}
          />
        </main>
      </div>
    );
  }
}

export default UserSettings;
