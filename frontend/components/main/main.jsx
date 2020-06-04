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
    const { currentUser, logout, servers, openModal } = this.props;

    return (
      <main className="main">
        <ServerPanel servers={servers} openModal={openModal} />
        <Sidebar />
        <UserBar currentUser={currentUser} logout={logout} />
      </main>
    );
  }
}

export default Main;
