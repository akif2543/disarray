import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NewMessageForm = ({
  handleChange,
  handleSubmit,
  body,
  name,
  memberbar,
}) => {
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
          value={body}
          placeholder={`Message ${formatPlaceholder(name)}`}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default NewMessageForm;
