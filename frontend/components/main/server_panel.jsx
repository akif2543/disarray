import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ServerPanel = ({ servers }) => (
  <section className="server-panel">
    <button className="home-btn" type="button"></button>
    <ul className="server-list">
      {/* {servers.map((s) => (
        <button key={s.id} className="server-icon" type="button"></button>
      ))} */}
      <button className="server-icon" type="button">
        <FontAwesomeIcon icon="plus" size="2x" className="server-btn" />
      </button>
    </ul>
  </section>
);

export default ServerPanel;
