import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import shortid from "shortid";
import { Link } from "react-router-dom";
import ServerBarIcon from "./server_bar_icon";

const ServerBar = ({ servers, openModal, modalOpen }) => {
  return (
    <section className="server-bar">
      <Link to="/@me">
        <button className="home-btn" type="button"></button>
      </Link>
      <ul className="server-list">
        {servers.map((s) => (
          <ServerBarIcon key={shortid.generate()} server={s} />
        ))}
        <button
          className={modalOpen ? "server-btn active" : "server-btn"}
          type="button"
          onClick={() => openModal("portal")}
        >
          <FontAwesomeIcon icon="plus" size="lg" />
        </button>
        <button className="server-btn" type="button">
          <FontAwesomeIcon icon="compass" size="lg" />
        </button>
      </ul>
    </section>
  );
};

export default ServerBar;
