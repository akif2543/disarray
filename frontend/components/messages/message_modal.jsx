import React from "react";

const MessageModal = (props) => (
  <div className="leave-server">
    <header>
      <h1>{header}</h1>
      {warning}
    </header>
    <footer>
      <button type="button" onClick={closeModal} className="cancel">
        Cancel
      </button>
      <button type="button" onClick={handler} className="leave">
        {buttonText}
      </button>
    </footer>
  </div>
);

export default MessageModal;
