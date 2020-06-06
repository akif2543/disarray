import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import shortid from "shortid";
import { Link } from "react-router-dom";

const ServerBar = ({ servers, openModal, modalOpen }) => {
  return (
    <section className="server-bar">
      <Link to="/@me">
        <button className="home-btn" type="button"></button>
      </Link>
      <ul className="server-list">
        {servers.map((s) => (
          <Link to={`/channels/${s.id}`} key={shortid.generate()}>
            <button className="server-icon" type="button"></button>{" "}
          </Link>
        ))}
        <button
          className={modalOpen ? "server-btn active" : "server-btn"}
          type="button"
          onClick={() => openModal("portal")}
        >
          <FontAwesomeIcon icon="plus" size="lg" />
        </button>
      </ul>
    </section>
  );
};

export default ServerBar;
