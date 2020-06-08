import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import UserBar from "../../user/user_bar";
import ServerDropdown from "./server_dropdown";
import ChannelList from "./channel_list";

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
    const {
      server,
      currentUser,
      openModal,
      openSettings,
      channels,
    } = this.props;
    const { dropdown } = this.state;
    const isOwner = currentUser.id === server.owner;

    return (
      <section className="side-bar server">
        <header onClick={this.toggleDropdown} className="dropdown-trigger">
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
            isOwner={isOwner}
            openSettings={openSettings}
          />
        )}
        <main>
          <ChannelList
            channels={channels}
            isOwner={isOwner}
            openModal={openModal}
            server={server}
          />
        </main>
        <UserBar currentUser={currentUser} openSettings={openSettings} />
      </section>
    );
  }
}

export default ServerPanel;
