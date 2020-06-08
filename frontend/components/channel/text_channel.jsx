import React from "react";
import NavBar from "../ui/nav_bar";
import MemberBar from "./member_bar";

class TextChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memberBar: true,
    };
    this.toggleMemberBar = this.toggleMemberBar.bind(this);
  }

  componentDidMount() {
    const { fetchChannel, match } = this.props;
    fetchChannel(match.params.channelId);
  }

  toggleMemberBar() {
    const { memberBar } = this.state;
    this.setState({ memberBar: !memberBar });
  }

  render() {
    const { channel, members, server } = this.props;
    const { memberBar } = this.state;

    return (
      <div className="text-channel">
        <NavBar
          channel={channel}
          memberBar={memberBar}
          toggleMemberBar={this.toggleMemberBar}
        />
        {memberBar && <MemberBar members={members} owner={server.owner} />}
      </div>
    );
  }
}

export default TextChannel;
