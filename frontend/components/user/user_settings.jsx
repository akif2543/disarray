import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import UserSettingsSidebar from "./user_settings_sidebar";
// import UserEditForm from "./user_edit_form";

class UserSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      username: this.props.currentUser.username,
      email: this.props.currentUser.email,
      password: "",
      passwordChange: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    const { currentUser, fetchCurrentUser, closeSettings } = this.props;
    fetchCurrentUser(currentUser.id);
    // document.addEventListener("keydown", (e) => {
    //   if (e.key === "Escape") return closeSettings();
    // });
  }

  handleClick() {
    this.setState({ edit: true });
  }

  handleChange(type) {
    return (e) => this.setState({ [type]: e.target.value });
  }

  handleUpdate(e) {
    e.preventDefault();
  }

  handleLogout() {
    const { logout, startLoading } = this.props;
    logout();
    startLoading();
  }

  render() {
    const { closeSettings, currentUser } = this.props;

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
          <div className="user-account">
            <img src={currentUser.avatar} alt="" className="avatar" />
            <div className="info">
              <div className="username">
                <h2>USERNAME</h2>
                <p>
                  {currentUser.username}
                  <span>#{currentUser.discriminator}</span>
                </p>
              </div>
              <div>
                <h2>EMAIL</h2>
                <p>{currentUser.email}</p>
              </div>
            </div>
            <button type="button" onClick={this.handleClick}>
              Edit
            </button>
          </div>
          {/* <UserEditForm
            handleChange={this.handleChange}
            handleUpdate={this.handleUpdate}
            currentUser={currentUser}
          /> */}
        </main>
      </div>
    );
  }
}

export default UserSettings;
