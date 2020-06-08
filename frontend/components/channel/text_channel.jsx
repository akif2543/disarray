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
    const { channel } = this.props;
    return (
      <div className="text-channel">
        <NavBar channel={channel} />
      </div>
    );
  }
}

export default TextChannel;
