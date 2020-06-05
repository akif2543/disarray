import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ServerPanel = ({ servers, openModal, modalOpen }) => {
  return (
    <section className="server-panel">
      <button className="home-btn" type="button"></button>
      <ul className="server-list">
        {/* {servers.map((s) => (
        <button key={s.id} className="server-icon" type="button"></button>
      ))} */}
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

export default ServerPanel;
