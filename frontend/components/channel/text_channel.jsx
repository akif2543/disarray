import React from "react";
import NavBar from "../ui/nav_bar";
import MemberBar from "./member_bar";

class TextChannel extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { fetchChannel, match } = this.props;
    fetchChannel(match.params.channelId);
  }

  render() {
    const { channel, members, server } = this.props;

    return (
      <div className="text-channel">
        <NavBar channel={channel} />
        <MemberBar members={members} owner={server.owner} />
      </div>
    );
  }
}

export default TextChannel;
