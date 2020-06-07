import React from "react";
import UserSettingsSidebar from "./user_settings_sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  }

  componentDidMount() {
    // fetch current user info on mount
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

  render() {
    const { logout, closeSettings, currentUser } = this.props;

    return (
      <div className="settings">
        <UserSettingsSidebar logout={logout} />
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
            <button type="edit">Edit</button>
          </div>
        </main>
      </div>
    );
  }
}

export default UserSettings;
