import React, { useEffect, useState } from "react";
import { generate } from "shortid";

import Friend from "./friend";

const FriendList = ({
  active,
  user,
  friends,
  pendingIn,
  pendingOut,
  blocked,
  friendError,
  clearError,
  requestFriend,
  respondToRequest,
  removeFriend,
  createConversation,
  openModal,
  push,
}) => {
  const [tag, setTag] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => setTag(e.target.value);

  const resetState = () => {
    setTag("");
    setError(null);
    setSuccess(false);
    clearError();
  };

  useEffect(() => {
    if (active === "add") resetState();
  }, [active]);

  const online = friends.filter((f) => f !== undefined && f.online);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (!tag.trim().length) return;
    if (!tag.includes("#")) {
      setError(
        `We need ${tag}'s four digit tag so we know which one they are.`
      );
      return;
    }
    const [username, discriminator] = tag.split("#");
    requestFriend(null, { username, discriminator }).then((action) => {
      if (action.type === "RECEIVE_PENDING") {
        setError(null);
        setSuccess(`Success! Your friend request to ${tag} was sent.`);
        setTag("");
      }
    });
  };

  const generateList = () => {
    switch (active) {
      case "online":
        return (
          <ul className="friends-list">
            {online.map((f) => (
              <Friend
                key={generate()}
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
                key={generate()}
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
                  key={generate()}
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
                    key={generate()}
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
              <Friend key={generate()} f={f} u={user} blocked />
            ))}
          </ul>
        );
      default:
        break;
    }
  };

  const err = friendError.length
    ? "Hm. Didn't work. Double check that the capitalization, spelling, any spaces, and numbers are correct."
    : null;

  const text = () => {
    if (success) {
      return <p className="friend-req-instructions success">{success}</p>;
    }
    if (error || err) {
      return <p className="friend-req-instructions err">{error || err}</p>;
    }

    return (
      <p className="friend-req-instructions">
        You can add a friend with their Disarray Tag. It&apos;s cAsE sEnSitIvE!
      </p>
    );
  };

  const noFriends = (
    <div className="doodle no-friends">
      <h2 className="doodle-sub">
        Wumpus is waiting on friends. You don&apos;t have to though!
      </h2>
    </div>
  );

  const generateContent = () => {
    switch (active) {
      case "online":
        return online.length ? (
          <div>
            <h2 className="list-head">{`ONLINE — ${online.length}`}</h2>
            {generateList()}
          </div>
        ) : (
          <div className="doodle online">
            <h2 className="doodle-sub">
              No one&apos;s around to play with Wumpus.
            </h2>
          </div>
        );
      case "all":
        return friends.length ? (
          <div>
            <h2 className="list-head">{`ALL FRIENDS — ${friends.length}`}</h2>
            {generateList()}
          </div>
        ) : (
          noFriends
        );
      case "pending":
        return pendingIn.length || pendingOut.length ? (
          <div>
            <h2 className="list-head">{`PENDING — ${
              pendingIn.length + pendingOut.length
            }`}</h2>
            {generateList()}
          </div>
        ) : (
          <div className="doodle pending">
            <h2 className="doodle-sub">
              There are no pending requests. Here&apos;s Wumpus for now.
            </h2>
          </div>
        );
      case "blocked":
        return blocked.length ? (
          <div>
            <h2 className="list-head">{`BLOCKED — ${blocked.length}`}</h2>
            {generateList()}
          </div>
        ) : (
          <div className="doodle blocked">
            <h2 className="doodle-sub">You can&apos;t unblock the Wumpus.</h2>
          </div>
        );
      default:
        break;
    }
  };

  return active === "add" ? (
    <div className="friends add">
      <form className="friend-request" onSubmit={handleSubmit}>
        <h1>ADD FRIEND</h1>
        {text()}
        <div className="input-wrapper">
          <input
            type="text"
            value={tag}
            onChange={handleChange}
            placeholder="Enter a Username#0000"
          />
          <button
            type="submit"
            className={
              tag.trim().length ? "friend-req-btn" : "friend-req-btn disabled"
            }
            disabled={!tag.trim().length}
          >
            Send Friend Request
          </button>
        </div>
      </form>
      {noFriends}
    </div>
  ) : (
    <div className="friends">{generateContent()}</div>
  );
};

export default FriendList;
