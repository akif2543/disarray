import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import UserBar from "../../user/user_bar";
import ServerDropdown from "./server_dropdown";
import ChannelList from "../../channel/channel_list";

class ServerPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: false,
      clicked: false,
    };
    this.setDropdown = this.setDropdown.bind(this);
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

  setDropdown() {
    const { dropdown } = this.state;
    this.setState({ dropdown: !dropdown });
  }

  toggleDropdown() {
    this.setState({ clicked: true });

    setTimeout(() => {
      this.setState({ clicked: false });
      this.setDropdown();
    }, 350);
  }

  render() {
    const {
      server,
      currentUser,
      openModal,
      openSettings,
      channels,
      match,
    } = this.props;
    const { dropdown, clicked } = this.state;
    const isOwner = currentUser.id === server.owner;

    return (
      <section className="side-bar server">
        <header className="server-head">
          <button
            type="button"
            onClick={this.toggleDropdown}
            className="dropdown-trigger"
          >
            <h1>{server.name}</h1>
            {dropdown ? (
              <FontAwesomeIcon
                icon="times"
                size="lg"
                className={clicked ? "close-dropdown" : ""}
              />
            ) : (
              <FontAwesomeIcon
                icon="angle-down"
                size="lg"
                className={clicked ? "open-dropdown" : ""}
              />
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
        <ChannelList
          channels={channels}
          isOwner={isOwner}
          openModal={openModal}
          openSettings={openSettings}
          server={server}
          match={match}
        />
        <UserBar currentUser={currentUser} openSettings={openSettings} />
      </section>
    );
  }
}

export default ServerPanel;
