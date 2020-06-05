import React from "react";

import ServerPanel from "../server/server_panel";
import Sidebar from "./side_bar";
import UserBar from "./user_bar";

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.stopLoading();
  }

  render() {
    const { currentUser, logout, servers, openModal, modalOpen } = this.props;

    return (
      <main className="main">
        <ServerPanel
          servers={servers}
          openModal={openModal}
          modalOpen={modalOpen}
        />
        <Sidebar />
        <UserBar currentUser={currentUser} logout={logout} />
      </main>
    );
  }
}

export default Main;
