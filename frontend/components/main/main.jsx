import React from "react";

import Sidebar from "./side_bar";
import UserBar from "../user/user_bar";
import NavBar from "../ui/nav_bar";

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.stopLoading();
  }

  render() {
    const { currentUser, openSettings, logout } = this.props;

    return (
      <main className="main">
        <Sidebar />
        <NavBar />
        <UserBar
          currentUser={currentUser}
          logout={logout}
          openSettings={openSettings}
        />
      </main>
    );
  }
}

export default Main;
