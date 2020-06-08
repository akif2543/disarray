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
    const { channel, members, currentUser, server } = this.props;
    const isOwner = currentUser.id === server.owner;
    return (
      <div className="text-channel">
        <NavBar channel={channel} />
        <MemberBar
          members={members}
          isOwner={isOwner}
          currentUser={currentUser}
        />
      </div>
    );
  }
}

export default TextChannel;
