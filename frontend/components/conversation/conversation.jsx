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
  sub,
  members,
  setActive,
  customizeConversation,
  fetchMessages,
  updateMessage,
  sidebarOpen,
  hideSidebar,
  showSidebar,
  unblock,
  match: {
    params: { conversationId },
  },
}) => {
  const toggleMemberBar = () => (sidebarOpen ? hideSidebar() : showSidebar());

  useEffect(() => {
    setActive(conversationId);
  }, [conversationId]);

  const { group, owner } = conversation;

  const { id, blocked } = currentUser;
  const otherId = conversation.members.find((m) => m && m !== id);
  const isBlocked = !group && blocked[otherId];

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
            isNew={messages.length < 30}
          />
          {conversation && (
            <NewMessageForm
              name={group ? name : `@${name}`}
              id={conversationId}
              otherId={otherId}
              isBlocked={isBlocked}
              unblock={unblock}
              memberbar={group ? sidebarOpen : false}
              type="Conversation"
              author={currentUser}
              sub={sub}
            />
          )}
        </div>
        {sidebarOpen && group && <MemberBar members={members} owner={owner} />}
      </div>
    </div>
  );
};

export default Conversation;
