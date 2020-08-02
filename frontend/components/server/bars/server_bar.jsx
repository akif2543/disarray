import React from "react";
import shortid from "shortid";
import ServerBarIcon from "./server_bar_icon";
import ServerBarBtn from "./server_bar_btn";

const ServerBar = ({
  servers,
  openModal,
  modalOpen,
  match,
  active,
  pending,
}) => {
  return (
    <div className="server-bar-wrapper">
      <section className="server-bar">
        <ul className="server-list">
          <ServerBarBtn
            type="home"
            active={active}
            pending={pending}
            match={match}
          />
          <div className="home-btn-divider" />
          {servers.map((s) =>
            s === undefined ? null : (
              <ServerBarIcon
                key={shortid.generate()}
                server={s}
                active={parseInt(match.params.serverId) === s.id}
              />
            )
          )}
          <ServerBarBtn
            type="create"
            modalOpen={modalOpen}
            openModal={openModal}
          />
          <ServerBarBtn type="explore" />
          <div className="home-btn-divider" />
        </ul>
      </section>
    </div>
  );
};

export default ServerBar;
