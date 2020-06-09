import React from "react";
import NavBar from "../ui/nav_bar";
import MemberBar from "./member_bar";
import ChatStream from "./chat_stream";

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
    const { channelId } = match.params;
    fetchChannel(channelId);

    App.cable.subscriptions.create(
      { channel: "ChatChannel", channel_id: channelId },
      {
        received: (data) => receiveMessage(data),
        speak(data) {
          return this.perform("speak", data);
        },
      }
    );
  }

  toggleMemberBar() {
    const { memberBar } = this.state;
    this.setState({ memberBar: !memberBar });
  }

  render() {
    const { channel, members, server, messages } = this.props;
    const { memberBar } = this.state;

    return (
      <div className="text-channel">
        <NavBar
          channel={channel}
          memberBar={memberBar}
          toggleMemberBar={this.toggleMemberBar}
        />
        {memberBar && <MemberBar members={members} owner={server.owner} />}
        <ChatStream messages={messages || []} />
      </div>
    );
  }
}

export default TextChannel;
