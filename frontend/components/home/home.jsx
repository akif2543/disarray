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
  friendError,
  requestFriend,
  respondToRequest,
  unfriend,
  directMessage,
  createConversation,
  customizeConversation,
  openModal,
  receiveRequest,
  receiveAcceptance,
  receiveRejection,
  receiveRetraction,
  loseFriend,
  history: { push },
}) => {
  const [active, setActive] = useState(friends.length ? "online" : "add");

  const switchTab = (tab) => () => setActive(tab);

  useEffect(() => {
    stopLoading();
    App.cable.subscriptions.create(
      { channel: "FriendsChannel", id: user.id },
      {
        received: (data) => {
          switch (data.action) {
            case "request":
              return receiveRequest(data);
            case "accept":
              return receiveAcceptance(data);
            case "decline":
              return receiveRejection(data);
            case "cancel":
              return receiveRetraction(data);
            case "unfriend":
              return loseFriend(data);
            default:
              break;
          }
        },
      }
    );
  }, []);

  return (
    <div className="main">
      <NavBar
        home
        switchTab={switchTab}
        active={active}
        customizeConversation={customizeConversation}
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

export default Home;
