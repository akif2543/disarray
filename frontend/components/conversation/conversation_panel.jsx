import React from "react";

import UserBar from "../user/user_bar";
import ConversationList from "./conversation_list";

const ConversationPanel = ({
  currentUser,
  openSettings,
  conversations,
  fetchCurrentUser,
}) => (
  <section className="side-bar convo">
    <header className="convo-search">
      <button type="button">Find or start a conversation [NYI]</button>
    </header>
    <main>
      <ConversationList
        conversations={conversations}
        currentUser={currentUser}
        fetchCurrentUser={fetchCurrentUser}
      />
    </main>
    <UserBar currentUser={currentUser} openSettings={openSettings} />
  </section>
);

export default ConversationPanel;
