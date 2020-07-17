import React, { useEffect, useRef, useState } from "react";

const EditConversationName = ({
  conversationName,
  id,
  customizeConversation,
  toggleEdit,
}) => {
  const node = useRef(null);
  const [name, setName] = useState(conversationName);

  const handleChange = (e) => setName(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim().length) {
      customizeConversation(id, { name }).then(toggleEdit());
    }
  };

  const handleClick = (e) => {
    if (node.current.contains(e.target)) return;
    toggleEdit();
  };

  const handleEsc = (e) => {
    if (e.key === "Escape") toggleEdit();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick, false);
    document.addEventListener("keydown", handleEsc, false);

    return () => {
      document.removeEventListener("mousedown", handleClick, false);
      document.removeEventListener("keydown", handleEsc, false);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="convo-name-change"
        value={name}
        onChange={handleChange}
        ref={node}
      />
    </form>
  );
};

export default EditConversationName;
