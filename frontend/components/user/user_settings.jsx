import React from "react";
import UserSettingsSidebar from "./user_settings_sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserEditForm from "./user_edit_form";

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
    const { currentUser, fetchCurrentUser } = this.props;
    fetchCurrentUser(currentUser.id);
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
            <button type="button" onClick={closeSettings}>
              <FontAwesomeIcon icon={["far", "times-circle"]} size="2x" />
            </button>
          </header>
          <div className="user-account">
            <img src={window.user1URL} alt="" className="avatar" />
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
