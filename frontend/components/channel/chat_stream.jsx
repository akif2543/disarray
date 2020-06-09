import React, { useEffect } from "react";
import shortid from "shortid";

const ChatStream = ({ messages }) => {
  let bottom;

  useEffect(() => {
    if (bottom.current) bottom.current.scrollIntoView();
  }, [messages]);

  return (
    <main className="chat">
      <ul className="message-list">
        <div ref={(elem) => (bottom = elem)} />
        {messages.map((m) => {
          if (m === undefined || !m) return null;
          return (
            <li key={shortid.generate()}>
              <h6>{m.author.username}</h6>
              <span>{m.createdAt}</span>
              <p>{m.body}</p>
              <div ref={(elem) => (bottom = elem)} />
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default ChatStream;
