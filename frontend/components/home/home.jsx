import React, { useEffect, useState } from "react";

import NavBar from "../ui/nav_bar";
import FriendList from "./friend_list";

const Home = ({
  stopLoading,
  user,
  friends,
  pendingIn,
  pendingOut,
  blocked,
  requestFriend,
  respondToRequest,
  removeFriend,
  directMessage,
  createConversation,
  openModal,
  history: { push },
}) => {
  const [active, setActive] = useState("online");

  const switchTab = (tab) => () => setActive(tab);

  useEffect(() => {
    stopLoading();
  }, []);

  return (
    <div className="main">
      <NavBar home switchTab={switchTab} active={active} />
      <FriendList
        active={active}
        user={user}
        friends={friends}
        pendingIn={pendingIn}
        pendingOut={pendingOut}
        blocked={blocked}
        requestFriend={requestFriend}
        respondToRequest={respondToRequest}
        removeFriend={removeFriend}
        directMessage={directMessage}
        createConversation={createConversation}
        openModal={openModal}
        push={push}
      />
    </div>
  );
};

export default Home;
