import React from "react";
import { connect } from "react-redux";

import { openModal, openSettings } from "../../../actions/ui_actions";
import { markRead } from "../../../actions/server_actions";
import { canAct, getCurrentServer } from "../../../reducers/selectors";

const ServerContextMenu = ({
  isOwner,
  id,
  oModal,
  oSettings,
  server,
  read,
  canAct,
}) => {
  const { hasUnreads, channels } = server;

  const handleRead = () => read({ id, channels });

  const handleModal = (name) => () => oModal({ name, id });

  const handleSettings = () => oSettings({ name: "server", id });

  return (
    <>
      <button
        type="button"
        onClick={handleRead}
        className={hasUnreads ? "" : "no-unreads"}
        disabled={!hasUnreads}
      >
        Mark As Read
      </button>
      <div className="menu-divider" />
      <button type="button" className="blue" onClick={handleModal("invite")}>
        Invite People
      </button>
      <div className="menu-divider" />
      {isOwner && (
        <button
          type="button"
          onClick={canAct ? handleSettings : null}
          className={canAct ? "" : "disabled"}
          disabled={!canAct}
        >
          Server Settings
        </button>
      )}
      <button type="button" onClick={handleModal("alias")}>
        Change Nickname
      </button>
      {isOwner ? (
        <>
          <div className="menu-divider" />
          <button type="button" onClick={handleModal("add channel")}>
            Create Channel
          </button>
        </>
      ) : (
        <>
          <div className="menu-divider" />
          <button
            type="button"
            className={canAct ? "red" : "red disabled"}
            onClick={canAct ? handleModal("leave") : null}
            disabled={!canAct}
          >
            Leave Server
          </button>
        </>
      )}
    </>
  );
};

const mSTP = (state, ownProps) => ({
  server: getCurrentServer(state, ownProps),
  canAct: canAct(state, ownProps),
});

const mDTP = (dispatch) => ({
  oModal: (modal) => dispatch(openModal(modal)),
  oSettings: (settings) => dispatch(openSettings(settings)),
  read: (server) => dispatch(markRead(server)),
});

const ServerContextMenuContainer = connect(mSTP, mDTP)(ServerContextMenu);

export default ServerContextMenuContainer;
