import React, { useEffect } from "react";
import NavBar from "../ui/nav_bar";
import ChatStream from "../messages/chat_stream";
import NewMessageForm from "../messages/new_message_form";
import MemberBar from "./member_bar";

const TextChannel = ({
  fetchChannel,
  match,
  channel,
  sidebarOpen,
  showSidebar,
  hideSidebar,
  messages,
  currentUser,
  fetchMessages,
  updateMessage,
  members,
  server,
  sub,
}) => {
  const { channelId } = match.params;

  const toggleMemberBar = () => (sidebarOpen ? hideSidebar() : showSidebar());

  useEffect(() => {
    if (channelId && !channel) {
      fetchChannel(channelId);
    } else if (channel && !channel.visited) {
      fetchChannel(channelId);
    }
  }, [channelId]);

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
            id={channel ? channelId : null}
            type="Channel"
            user={currentUser}
            updateMessage={updateMessage}
          />
          {channel && (
            <NewMessageForm
              name={`#${channel.name}`}
              id={channelId}
              memberbar={sidebarOpen}
              type="Channel"
              author={currentUser}
              sub={sub}
            />
          )}
        </div>
        {sidebarOpen && (
          <MemberBar members={members} owner={server.owner} s={server.id} />
        )}
      </div>
    </div>
  );
};

export default TextChannel;
