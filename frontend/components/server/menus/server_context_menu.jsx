import React from "react";
import { connect } from "react-redux";

import { openModal, openSettings } from "../../../actions/ui_actions";
import { markRead } from "../../../actions/server_actions";
import { getCurrentServer, restricted } from "../../../reducers/selectors";

const ServerContextMenu = ({
  isOwner,
  id,
  oModal,
  oSettings,
  server,
  read,
  notAllowed,
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
          onClick={notAllowed ? null : handleSettings}
          className={notAllowed ? "disabled" : ""}
          disabled={notAllowed}
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
            className={notAllowed ? "red disabled" : "red"}
            onClick={notAllowed ? null : handleModal("leave")}
            disabled={notAllowed}
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
  notAllowed: restricted(state, ownProps),
});

const mDTP = (dispatch) => ({
  oModal: (modal) => dispatch(openModal(modal)),
  oSettings: (settings) => dispatch(openSettings(settings)),
  read: (server) => dispatch(markRead(server)),
});

const ServerContextMenuContainer = connect(mSTP, mDTP)(ServerContextMenu);

export default ServerContextMenuContainer;
