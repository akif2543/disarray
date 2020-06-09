import React, { useEffect, useState } from "react";
import NavBar from "../ui/nav_bar";
import ChatStream from "../messages/chat_stream";
import NewMessageForm from "../messages/new_message_form";

const TextChannel = ({
  fetchChannel,
  match,
  receiveMessage,
  channel,
  sidebarOpen,
  showSidebar,
  hideSidebar,
  messages,
  currentUser,
}) => {
  const [messageBody, setMessageBody] = useState("");

  const { channelId } = match.params;

  const toggleMemberBar = () => (sidebarOpen ? hideSidebar() : showSidebar());

  useEffect(() => {
    fetchChannel(channelId);
  }, [channelId]);

  useEffect(() => {
    App.cable.subscriptions.create(
      { channel: "ChatChannel", channel_id: channelId },
      {
        received: (data) => receiveMessage(data),
        speak(data) {
          return this.perform("speak", data);
        },
      }
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = {
      body: messageBody,
      author_id: currentUser.id,
      messageable_type: "Channel",
      messageable_id: channel.id,
    };
    App.cable.subscriptions.subscriptions[0].speak({ message });
    setMessageBody("");
  };

  const handleChange = (e) => setMessageBody(e.target.value);

  return (
    <div className="text-channel">
      <NavBar
        channel={channel}
        memberbar={sidebarOpen}
        toggleMemberBar={toggleMemberBar}
      />
      {/* {memberBar && <MemberBar members={members} owner={server.owner} />} */}
      <ChatStream messages={messages || []} memberbar={sidebarOpen} />
      {channel && (
        <NewMessageForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          body={messageBody}
          name={`#${channel.name}`}
          memberbar={sidebarOpen}
        />
      )}
    </div>
  );
};

export default TextChannel;

// class TextChannel extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       memberBar: true,
//     };
//     this.toggleMemberBar = this.toggleMemberBar.bind(this);
//   }

//   componentDidMount() {
//     const { fetchChannel, match } = this.props;
//     const { channelId } = match.params;
//     fetchChannel(channelId);

//     App.cable.subscriptions.create(
//       { channel: "ChatChannel", channel_id: channelId },
//       {
//         received: (data) => receiveMessage(data),
//         speak(data) {
//           return this.perform("speak", data);
//         },
//       }
//     );
//   }

//   toggleMemberBar() {
//     const { memberBar } = this.state;
//     this.setState({ memberBar: !memberBar });
//   }

//   render() {
//     const { channel, members, server, messages } = this.props;
//     const { memberBar } = this.state;

//     return (
//       <div className="text-channel">
//         <NavBar
//           channel={channel}
//           memberBar={memberBar}
//           toggleMemberBar={this.toggleMemberBar}
//         />
//         {memberBar && <MemberBar members={members} owner={server.owner} />}
//         <ChatStream messages={messages || []} />
//       </div>
//     );
//   }
// }

// export default TextChannel;
