import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import UserBar from "../../user/user_bar";
import ServerDropdown from "./server_dropdown";

class ServerPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: false,
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  componentDidMount() {
    const { requestServer, match } = this.props;
    requestServer(match.params.serverId);
  }

  componentDidUpdate(prevProps) {
    const { serverId } = this.props.match.params;
    const prevId = prevProps.match.params.serverId;
    if (serverId !== prevId) this.props.requestServer(serverId);
  }

  toggleDropdown() {
    const { dropdown } = this.state;
    this.setState({ dropdown: !dropdown });
  }

  render() {
    const { server, currentUser, openModal, openSettings } = this.props;
    const { dropdown } = this.state;
    return (
      <section className="side-bar server">
        <header onClick={this.toggleDropdown}>
          <h1>{server.name}</h1>
          <button type="button">
            {dropdown ? (
              <FontAwesomeIcon icon="times" size="lg" />
            ) : (
              <FontAwesomeIcon icon="angle-down" size="lg" spin={dropdown} />
            )}
          </button>
        </header>
        {dropdown && (
          <ServerDropdown
            toggleDropdown={this.toggleDropdown}
            openModal={openModal}
            isOwner={currentUser.id === server.owner}
            openSettings={openSettings}
          />
        )}
        <main></main>
        <UserBar currentUser={currentUser} openSettings={openSettings} />
      </section>
    );
  }
}

export default ServerPanel;
