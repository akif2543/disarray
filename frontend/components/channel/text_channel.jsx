import React from "react";
import NavBar from "../ui/nav_bar";

class TextChannel extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { fetchChannel, match } = this.props;
    fetchChannel(match.params.channelId);
  }

  render() {
    return (
      <div className="text-channel">
        <NavBar />
      </div>
    );
  }
}

export default TextChannel;
