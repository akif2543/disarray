import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NewMessageForm = ({
  name,
  memberbar,
  type,
  id,
  author,
  sub,
  otherId,
  isBlocked,
  unblock,
}) => {
  const [messageBody, setMessageBody] = useState("");
  const handleChange = (e) => setMessageBody(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = {
      body: messageBody,
      author_id: author.id,
      messageable_type: type,
      messageable_id: id,
    };
    sub.speak({ message });
    setMessageBody("");
  };

  const formatPlaceholder = (input) =>
    input.length < 70 ? input : input.slice(0, 71).concat("...");

  return (
    <div
      className={
        memberbar
          ? `new-message-form ${isBlocked ? "blocked" : ""}`
          : `new-message-form ${isBlocked ? "blocked " : ""}wide`
      }
    >
      {isBlocked ? (
        <div className="unblock-bar">
          <h1>You cannot send messages to a user you have blocked.</h1>
          <button
            type="button"
            className="unblock-btn"
            onClick={unblock(otherId)}
          >
            Unblock
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <button type="button" className="add-file">
              <FontAwesomeIcon icon="plus-circle" size="lg" />
            </button>
            <input
              type="text"
              value={messageBody}
              placeholder={`Message ${formatPlaceholder(name)}`}
              onChange={handleChange}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default NewMessageForm;
