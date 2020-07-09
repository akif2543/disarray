import React, { useState, useEffect } from "react";

const EditMessageForm = ({ m, toggleEdit, updateMessage, short }) => {
  const [body, setBody] = useState(m.body);

  const handleClose = (e) => {
    if (e.key === "Escape") toggleEdit();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleClose);
    return () => document.removeEventListener("keydown", handleClose);
  }, []);

  const handleChange = (e) => setBody(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (body.trim().length) {
      const message = {
        id: m.id,
        body,
        author_id: m.author,
        messageable_type: m.textChannel ? "Channel" : "Conversation",
        messageable_id: m.messageableId,
      };
      updateMessage(message);
      toggleEdit();
    }
  };

  return (
    <form
      className={short ? "edit-message-form short" : "edit-message-form"}
      onSubmit={handleSubmit}
    >
      <input type="text" value={body} onChange={handleChange} autoFocus />
      <span className="edit-txt">
        escape to{" "}
        <span className="edit-link" onClick={toggleEdit}>
          cancel
        </span>{" "}
        • enter to{" "}
        <span className="edit-link" onClick={handleSubmit}>
          save
        </span>
      </span>
    </form>
  );
};

export default EditMessageForm;
