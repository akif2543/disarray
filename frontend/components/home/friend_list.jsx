import React, { useEffect, useState } from "react";
import Friend from "./friend";
import shortid, { generate } from "shortid";

const FriendList = ({
  active,
  user,
  friends,
  pendingIn,
  pendingOut,
  blocked,
  friendError,
  requestFriend,
  respondToRequest,
  removeFriend,
  directMessage,
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
  };

  useEffect(() => {
    if (active === "add") resetState();
  }, [active]);

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
    </div>
  ) : (
    <div className="friends">
      <h2 className="list-head">{listName()}</h2>
      {generateList()}
    </div>
  );
};

export default FriendList;
