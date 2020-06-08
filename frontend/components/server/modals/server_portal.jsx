import React from "react";

const ServerPortal = ({ handleClick }) => (
  <div className="server-portal">
    <h1>Oh, another server, huh?</h1>
    <div className="portal-group">
      <section onClick={handleClick("create")}>
        <h3>
          <span>Create</span> a new server and invite your friends. It's free!
        </h3>
        <img src={window.scURL} alt="" />
        <button
          type="button"
          className="sp-left"
          onClick={handleClick("create")}
        >
          Create a server
        </button>
      </section>
      <section onClick={handleClick("join")}>
        <h3>
          <span>Join</span> a server with an invite code or link.
        </h3>
        <img src={window.sjURL} alt="" />
        <button
          type="button"
          className="sp-right"
          onClick={handleClick("join")}
        >
          Join a server
        </button>
      </section>
    </div>
  </div>
);

export default ServerPortal;
