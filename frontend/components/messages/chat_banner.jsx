import React, { useRef, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  getCurrentChannel,
  getCurrentServer,
  getCurrentConversation,
  getCurrentUser,
  getConversationMembers,
  getServerMembers,
} from "../../reducers/selectors";
import { openSettings } from "../../actions/ui_actions";
import GroupDMIcon from "../conversation/group_dm_icon";

const ChatBanner = ({
  currentUser,
  channel,
  server,
  convo,
  members,
  openSettings,
}) => {
  let title;
  let avatar;

  if (convo) {
    const { id, icon, name, group, messages } = convo;
    const mems = members
      .filter((user) => user !== undefined && user.id !== currentUser.id)
      .map((u) => u.username)
      .join(", ");
    const m = members.find((u) => u !== undefined && u.id !== currentUser.id);
    title = name || mems;
    avatar = icon || m.avatar;

    if (group) {
      avatar = icon ? (
        <img src={icon} alt="" className="avatar" />
      ) : (
        <GroupDMIcon id={id} />
      );
    } else {
      avatar = <img src={avatar} alt="" className="avatar" />;
    }

    return (
      <>
        <div
          className="chat-banner convo"
          style={{ height: `calc(97% - ${50 * messages.length}px)` }}
        >
          {avatar}
          <h1 className="hed">{title}</h1>
          {group ? (
            <h2 className="sub">
              Welcome to the beginning of the <strong>{title}</strong> group.
            </h2>
          ) : (
            <h2 className="sub">
              This is the beginning of your direct message history with{" "}
              <strong>{`@${title}`}</strong>.
            </h2>
          )}
        </div>
        {Boolean(messages.length) && <div className="border" />}
      </>
    );
  }

  const newServer = members.length === 1 && channel.id === server.channels[0];
  title = `Welcome to ${newServer ? server.name : `#${channel.name}`}`;
  const sub = newServer
    ? "This is the beginning of this server."
    : `This is the start of the #${channel.name} channel.`;

  const { messages } = channel;

  if (newServer) {
    return (
      <>
        <div
          className="chat-banner server"
          style={{ height: `calc(97% - ${50 * messages.length}px)` }}
        >
          <h1 className="hed">{title}</h1>
          <h2 className="sub">{sub}</h2>
        </div>
        {Boolean(messages.length) && <div className="border" />}
      </>
    );
  }

  const isOwner = currentUser.id === server.owner;

  return (
    <>
      <div
        className="chat-banner channel"
        style={{ height: `calc(97% - ${50 * messages.length}px)` }}
      >
        <div className="group-dm-icon">
          <FontAwesomeIcon icon="hashtag" size="3x" />
        </div>
        <h1 className="hed">{title}</h1>
        <h2 className="sub">{sub}</h2>
        {isOwner && (
          <button
            type="button"
            className="edit-btn"
            onClick={() => openSettings("channel")}
          >
            Edit Channel
          </button>
        )}
      </div>
      {Boolean(messages.length) && <div className="border" />}
    </>
  );
};

const mSTP = (state, ownProps) => ({
  currentUser: getCurrentUser(state),
  channel: getCurrentChannel(state, ownProps),
  server: getCurrentServer(state, ownProps),
  convo: getCurrentConversation(state, ownProps),
  members: getCurrentConversation(state, ownProps)
    ? getConversationMembers(state, ownProps)
    : getServerMembers(state, ownProps),
});

const mDTP = (dispatch) => ({
  openSettings: (settings) => dispatch(openSettings(settings)),
});

const ChatBannerContainer = withRouter(connect(mSTP, mDTP)(ChatBanner));

export default ChatBannerContainer;
