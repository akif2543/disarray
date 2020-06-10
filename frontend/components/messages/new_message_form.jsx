import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NewMessageForm = ({ name, memberbar, type, id, author }) => {
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
    App.cable.subscriptions.subscriptions[0].speak({ message });
    setMessageBody("");
  };

  const formatPlaceholder = (input) =>
    input.length < 70 ? input : input.slice(0, 71).concat("...");

  return (
    <form
      className={memberbar ? "new-message-form" : "new-message-form wide"}
      onSubmit={handleSubmit}
    >
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
  );
};

export default NewMessageForm;
