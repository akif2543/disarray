import React from "react";

import NavBar from "../ui/nav_bar";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.stopLoading();
  }

  render() {
    const { currentUser } = this.props;

    return (
      <main className="main">
        <NavBar home />
      </main>
    );
  }
}

export default Home;
