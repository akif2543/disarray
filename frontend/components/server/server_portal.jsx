import React from "react";

const ServerPortal = (props) => (
  <div className="server-portal">
    <h1>Oh, another server, huh?</h1>
    <div className="portal-group">
      <section>
        <h3>
          <span>Create</span> a new server and invite your friends. It's free!
        </h3>
        <img src={window.scURL} alt="" />
        <button type="button" className="sp-left">
          Create a server
        </button>
      </section>
      <section>
        <h3>
          <span>Join</span> a server with an invite code or link.
        </h3>
        <img src={window.sjURL} alt="" />
        <button type="button" className="sp-right">
          Join a server
        </button>
      </section>
    </div>
  </div>
);

export default ServerPortal;
