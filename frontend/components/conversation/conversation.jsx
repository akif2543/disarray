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
  customizeConversation,
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
  sub,
}) => {
  const toggleMemberBar = () => (sidebarOpen ? hideSidebar() : showSidebar());

  useEffect(() => {
    fetchConversation(conversationId);
  }, [conversationId]);

  useEffect(() => {
    // App.cable.subscriptions.create(
    //   { channel: "ChatChannel", conversation_id: conversationId },
    //   {
    //     received: (data) =>
    //       data.remove ? removeMessage(data) : receiveMessage(data),
    //     speak(data) {
    //       return this.perform("speak", data);
    //     },
    //   }
    // );
  }, []);

  const { group, owner } = conversation;

  return (
    <div className="text-channel">
      <NavBar
        conversationName={name}
        group={group}
        memberbar={sidebarOpen}
        toggleMemberBar={toggleMemberBar}
        isOwner={currentUser.id === owner}
        customizeConversation={customizeConversation}
        id={conversationId}
        convo
      />
      <div className="chat-group">
        <div className="chat-room">
          <ChatStream
            messages={messages || []}
            memberbar={group ? sidebarOpen : false}
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
              memberbar={group ? sidebarOpen : false}
              type="Conversation"
              author={currentUser}
              sub={sub}
              // sub={App.cable.subscriptions.subscriptions.find((s) =>
              //   s.identifier.includes(`"conversation_id":"${conversationId}"`)
              // )}
            />
          )}
        </div>
        {sidebarOpen && group && <MemberBar members={members} owner={owner} />}
      </div>
    </div>
  );
};

export default Conversation;
