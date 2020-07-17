import React, { useEffect } from "react";

import NavBar from "../ui/nav_bar";
import ChatStream from "../messages/chat_stream";
import NewMessageForm from "../messages/new_message_form";
import MemberBar from "../channel/member_bar";

const Conversation = ({
  currentUser,
  conversation,
  messages,
  name,
  members,
  fetchConversation,
  fetchMessages,
  receiveMessage,
  removeMessage,
  updateMessage,
  sidebarOpen,
  hideSidebar,
  showSidebar,
  match: {
    params: { conversationId },
  },
}) => {
  const toggleMemberBar = () => (sidebarOpen ? hideSidebar() : showSidebar());

  useEffect(() => {
    fetchConversation(conversationId);
  }, [conversationId]);

  useEffect(() => {
    App.cable.subscriptions.create(
      { channel: "ChatChannel", conversation_id: conversationId },
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
        conversationName={name}
        group={conversation.group}
        memberbar={sidebarOpen}
        toggleMemberBar={toggleMemberBar}
        isOwner={currentUser.id === conversation.owner}
        convo
      />
      <div className="chat-group">
        <div className="chat-room">
          <ChatStream
            messages={messages || []}
            memberbar={sidebarOpen}
            fetchMessages={fetchMessages}
            id={conversationId}
            type="Conversation"
            user={currentUser}
            updateMessage={updateMessage}
          />
          {conversation && (
            <NewMessageForm
              name={name}
              id={conversationId}
              memberbar={sidebarOpen}
              type="Conversation"
              author={currentUser}
            />
          )}
        </div>
        {sidebarOpen && (
          <MemberBar members={members} owner={conversation.owner} />
        )}
      </div>
    </div>
  );
};

export default Conversation;
