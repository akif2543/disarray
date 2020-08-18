import React from "react";
import { formatDate } from "../../util/date_util";

const MessageModal = ({ m, a, closeModal, deleteMessage, del }) => {
  const handleClick = () => {
    if (del) deleteMessage(m.id).then(closeModal());
  };
  return (
    <div className="modal-confirm msg">
      <header>
        <h1>{del ? "DELETE MESSAGE" : "PIN IT. PIN IT GOOD."}</h1>
        <h2>
          {del
            ? "Are you sure you want to delete this message?"
            : "Hey, just double checking that you want to pin this message to the current channel for posterity and greatness?"}
        </h2>
      </header>
      <main>
        <div className="message snippet">
          <img src={a.avatar} alt="" className="avatar" />
          <div className="content snippet">
            <header className="msg-head snippet">
              <h2 className="author-name">{a.username}</h2>
              <span className="date">{formatDate(m.createdAt)}</span>
            </header>
            <p>
              {m.body}
              {m.createdAt !== m.updatedAt && (
                <span className="edited">(edited)</span>
              )}
            </p>
          </div>
        </div>
      </main>
      <footer>
        <button type="button" onClick={closeModal} className="cancel">
          Cancel
        </button>
        <button type="button" onClick={handleClick} className="leave">
          {del ? "Delete" : "Oh yeah. Pin it."}
        </button>
      </footer>
    </div>
  );
};

export default MessageModal;
