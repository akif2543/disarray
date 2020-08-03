import React, { useEffect, useState } from "react";

import NavBar from "../ui/nav_bar";
import FriendList from "./friend_list";

const Friends = ({
  stopLoading,
  user,
  friends,
  pendingIn,
  pendingOut,
  blocked,
  friendError,
  requestFriend,
  respondToRequest,
  unfriend,
  directMessage,
  createConversation,
  customizeConversation,
  openModal,
  history: { push },
}) => {
  const [active, setActive] = useState(friends.length ? "online" : "add");

  const switchTab = (tab) => () => setActive(tab);

  useEffect(() => {
    stopLoading();
  }, []);

  return (
    <div className="main">
      <NavBar
        home
        switchTab={switchTab}
        active={active}
        customizeConversation={customizeConversation}
        pending={pendingIn.length}
      />
      <FriendList
        active={active}
        user={user}
        friends={friends}
        pendingIn={pendingIn}
        pendingOut={pendingOut}
        blocked={blocked}
        friendError={friendError}
        requestFriend={requestFriend}
        respondToRequest={respondToRequest}
        removeFriend={unfriend}
        directMessage={directMessage}
        createConversation={createConversation}
        openModal={openModal}
        push={push}
      />
    </div>
  );
};

export default Friends;
