import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.stopLoading();
  }

  render() {
    const { currentUser, logout } = this.props;

    return (
      <div className="main">
        <div className="user-bar">
          <ul className="user-bar-info">
            <h1>{currentUser.username}</h1>
            <h2>#{currentUser.discriminator}</h2>
          </ul>
          <ul className="user-bar-ilist">
            <FontAwesomeIcon icon="microphone" className="user-bar-icon" />
            <FontAwesomeIcon icon="headphones-alt" className="user-bar-icon" />
            <Link to="/" onClick={logout}>
              <FontAwesomeIcon icon="cog" className="user-bar-icon temp-log" />
            </Link>
          </ul>
        </div>
      </div>
    );
  }
}

export default Main;
