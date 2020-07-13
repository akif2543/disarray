import React, { useEffect } from "react";
import Friend from "./friend";
import shortid, { generate } from "shortid";

const FriendList = ({
  active,
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
  push,
}) => {
  useEffect(() => {}, [active]);

  const listName = () => {
    switch (active) {
      case "online":
        return `ONLINE—${friends.length}`;
      case "all":
        return `ALL FRIENDS—${friends.length}`;
      case "pending":
        return `PENDING—${pendingIn.length + pendingOut.length}`;
      case "blocked":
        return `BLOCKED—${blocked.length}`;
      default:
        break;
    }
  };

  const generateList = () => {
    switch (active) {
      case "online":
        return (
          <ul className="friends-list">
            {friends.map((f) => (
              <Friend
                key={shortid.generate()}
                f={f}
                u={user}
                createConversation={createConversation}
                removeFriend={removeFriend}
                push={push}
                openModal={openModal}
                all
              />
            ))}
          </ul>
        );
      case "all":
        return (
          <ul className="friends-list">
            {friends.map((f) => (
              <Friend
                key={shortid.generate()}
                f={f}
                u={user}
                createConversation={createConversation}
                removeFriend={removeFriend}
                openModal={openModal}
                push={push}
                all
              />
            ))}
          </ul>
        );
      case "pending":
        return (
          <ul className="friends-list">
            {pendingIn
              .map((f) => (
                <Friend
                  key={shortid.generate()}
                  f={f}
                  u={user}
                  respondToRequest={respondToRequest}
                  pending
                  incoming
                />
              ))
              .concat(
                pendingOut.map((f) => (
                  <Friend
                    key={shortid.generate()}
                    f={f}
                    u={user}
                    respondToRequest={respondToRequest}
                    pending
                    outgoing
                  />
                ))
              )}
          </ul>
        );
      case "blocked":
        return (
          <ul className="friends-list">
            {blocked.map((f) => (
              <Friend key={shortid.generate()} f={f} u={user} blocked />
            ))}
          </ul>
        );
      default:
        break;
    }
  };

  return (
    <div className="friends">
      <h2 className="list-head">{listName()}</h2>
      {generateList()}
    </div>
  );
};

export default FriendList;
