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
  unreads,
  currentUser,
  setActive,
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
          {unreads.map((c) => {
            if (c === undefined) return null;
            const { members } = c;
            const convoMembers = members
              .filter((user) => user !== undefined && user.id !== currentUser.id)
              .map((u) => u.username)
              .join(", ");
            const m = members.find((u) => u.id !== currentUser.id);
            return (
              <ServerBarBtn
                key={shortid.generate()}
                type="convo"
                c={c}
                m={m}
                n={convoMembers}
                setActive={setActive}
              />
            );
          })}
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
