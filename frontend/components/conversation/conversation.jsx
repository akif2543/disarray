import React, { useEffect } from "react";

import NavBar from "../ui/nav_bar";
import ChatStream from "../messages/chat_stream";
import NewMessageForm from "../messages/new_message_form";
// import MemberBar from "../channel/member_bar";

const Conversation = ({
  currentUser,
  conversation,
  messages,
  otherUser,
  fetchConversation,
  fetchMessages,
  receiveMessage,
  updateMessage,
  sidebarOpen,
  hideSidebar,
  showSidebar,
  match,
}) => {
  const { conversationId } = match.params;

  const toggleMemberBar = () => (sidebarOpen ? hideSidebar() : showSidebar());

  useEffect(() => {
    fetchConversation(conversationId);
  }, [conversationId]);

  useEffect(() => {
    App.cable.subscriptions.create(
      { channel: "ChatChannel", conversation_id: conversationId },
      {
        received: (data) => receiveMessage(data),
        speak(data) {
          return this.perform("speak", data);
        },
      }
    );
  }, []);

  return (
    <div className="text-channel">
      <NavBar
        otherUser={otherUser}
        memberbar={sidebarOpen}
        toggleMemberBar={toggleMemberBar}
      />
      {/* {sidebarOpen && <MemberBar members={members}/>} */}
      <div className="chat-room">
        <ChatStream
          messages={messages || []}
          memberbar={false}
          fetchMessages={fetchMessages}
          id={conversationId}
          type="Conversation"
          user={currentUser}
          updateMessage={updateMessage}
        />
        {conversation && (
          <NewMessageForm
            name={otherUser ? `@${otherUser.username}` : ""}
            id={conversationId}
            memberbar={false}
            type="Conversation"
            author={currentUser}
          />
        )}
      </div>
    </div>
  );
};

export default Conversation;
