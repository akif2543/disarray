import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NewMessageForm = ({
  handleChange,
  handleSubmit,
  body,
  name,
  memberbar,
}) => (
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
        placeholder={`Message ${name}`}
        onChange={handleChange}
      />
    </div>
  </form>
);

export default NewMessageForm;
