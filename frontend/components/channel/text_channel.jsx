import React, { useEffect } from "react";
import NavBar from "../ui/nav_bar";
import ChatStream from "../messages/chat_stream";
import NewMessageForm from "../messages/new_message_form";
import MemberBar from "./member_bar";

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
  fetchMessages,
  updateMessage,
  removeMessage,
  members,
  server,
}) => {
  const { channelId } = match.params;

  const toggleMemberBar = () => (sidebarOpen ? hideSidebar() : showSidebar());

  useEffect(() => {
    fetchChannel(channelId);
  }, [channelId]);

  useEffect(() => {
    App.cable.subscriptions.create(
      { channel: "ChatChannel", channel_id: channelId },
      {
        received: (data) =>
          data.remove ? removeMessage(data) : receiveMessage(data),
        speak(data) {
          return this.perform("speak", data);
        },
      }
    );
  }, []);

  return (
    <div className="text-channel">
      <NavBar
        channel={channel}
        memberbar={sidebarOpen}
        toggleMemberBar={toggleMemberBar}
      />
      <div className="chat-group">
        <div className="chat-room">
          <ChatStream
            messages={messages || []}
            memberbar={sidebarOpen}
            fetchMessages={fetchMessages}
            id={channel ? channel.id : null}
            type="Channel"
            user={currentUser}
            updateMessage={updateMessage}
          />
          {channel && (
            <NewMessageForm
              name={`#${channel.name}`}
              id={channel.id}
              memberbar={sidebarOpen}
              type="Channel"
              author={currentUser}
            />
          )}
        </div>
        {sidebarOpen && <MemberBar members={members} owner={server.owner} />}
      </div>
    </div>
  );
};

export default TextChannel;
