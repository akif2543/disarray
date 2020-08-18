import React, { useState, useRef, memo, useEffect } from "react";

import UserPopoutContainer from "../user/user_popout";
import MessageOpts from "./message_opts";
import EditMessageForm from "./edit_message_form";
import MessageDropdown from "./message_dropdown";
import ContextMenu from "../ui/context_menu";

import { shortDate, formatDate } from "../../util/date_util";

const areEqual = (prevProps, nextProps) => {
  if (prevProps.m.updatedAt !== nextProps.m.updatedAt) return false;
  if (
    prevProps.a.username !== nextProps.a.username ||
    prevProps.a.avatar !== nextProps.a.avatar
  )
    return false;
  if (
    prevProps.s &&
    prevProps.a.servers[prevProps.s.id] !== nextProps.a.servers[prevProps.s.id]
  )
    return false;
  if (prevProps.openModal !== nextProps.openModal) return false;
  return true;
};

const Message = ({
  m,
  bottom,
  short,
  u,
  updateMessage,
  a,
  history,
  openModal,
  s,
}) => {
  const nameEl = useRef(null);
  const mesEl = useRef(null);
  const imgEl = useRef(null);

  const [popout, setPopout] = useState(false);
  const [options, setOptions] = useState(false);
  const [editing, setEditing] = useState(false);

  const [dropdown, setDropdown] = useState(false);
  const [userContext, setUserContext] = useState(false);
  const [messageContext, setMessageContext] = useState(false);

  const [userClick, setUserClick] = useState([]);
  const [messageClick, setMessageClick] = useState([]);

  const toggleDropdown = () => setDropdown(!dropdown);

  const toggleUserContext = () => setUserContext(!userContext);
  const toggleMessageContext = () => setMessageContext(!messageContext);

  const togglePopout = () => setPopout(!popout);
  const toggleOptions = (bool) => () => setOptions(bool);

  const toggleEdit = () => setEditing(!editing);

  const isAuthor = u.id === m.author;
  const edited = m.createdAt !== m.updatedAt;

  const handleUserContext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setUserContext(true);
    setUserClick([e.clientX, e.clientY]);
  };

  const handleMessageContext = (e) => {
    e.preventDefault();
    setMessageContext(true);
    setMessageClick([e.clientX, e.clientY]);
  };

  useEffect(() => {
    if (nameEl && mesEl && imgEl) {
      mesEl.current.addEventListener("contextmenu", handleMessageContext);
      nameEl.current.addEventListener("contextmenu", handleUserContext);
      imgEl.current.addEventListener("contextmenu", handleUserContext);
    }
    return () => {
      if (nameEl && mesEl && imgEl) {
        mesEl.current.removeEventListener("contextmenu", handleMessageContext);
        nameEl.current.removeEventListener("contextmenu", handleUserContext);
        imgEl.current.removeEventListener("contextmenu", handleUserContext);
      }
    };
  }, [mesEl, nameEl, imgEl]);

  return (
    <div
      className={short ? "message short" : "message"}
      onMouseOver={toggleOptions(true)}
      onFocus={toggleOptions(true)}
      onMouseLeave={toggleOptions(false)}
      onBlur={toggleOptions(false)}
      ref={mesEl}
    >
      {options && !editing && (
        <MessageOpts
          isAuthor={isAuthor}
          toggleEdit={toggleEdit}
          toggleDropdown={toggleDropdown}
          short={short}
        />
      )}
      {dropdown && (
        <MessageDropdown
          isAuthor={isAuthor}
          el={mesEl}
          toggleDropdown={toggleDropdown}
          toggleEdit={toggleEdit}
          history={history}
          id={m.id}
          openModal={openModal}
        />
      )}
      <img
        src={a.avatar}
        alt=""
        className="avatar"
        ref={imgEl}
        onClick={togglePopout}
      />
      {short && (
        <span className={editing ? "date edit" : "date"}>
          {shortDate(m.createdAt)}
        </span>
      )}
      <div className={short ? "content short" : "content"}>
        <header className="msg-head">
          <h2 className="author-name" ref={nameEl} onClick={togglePopout}>
            {m.textChannel ? a.servers[s.id] || a.username : a.username}
          </h2>
          {userContext && (
            <ContextMenu
              type="user"
              dir="right"
              coords={userClick}
              toggleContext={toggleUserContext}
              id={a.id}
              s={Boolean(s)}
            />
          )}
          {popout && (
            <UserPopoutContainer
              m={a}
              id={m.textChannel ? s.id : null}
              togglePopout={togglePopout}
              el={nameEl}
              chat
            />
          )}
          <span className="date">{formatDate(m.createdAt)}</span>
        </header>
        {editing ? (
          <EditMessageForm
            m={m}
            toggleEdit={toggleEdit}
            updateMessage={updateMessage}
            short={short}
          />
        ) : (
          <p>
            {m.body}
            {edited && <span className="edited">(edited)</span>}
          </p>
        )}
      </div>
      <div ref={bottom} />
      {messageContext && (
        <ContextMenu
          type="message"
          coords={messageClick}
          id={m.id}
          isAuthor={isAuthor}
          toggleEdit={toggleEdit}
          toggleContext={toggleMessageContext}
        />
      )}
    </div>
  );
};

export default memo(Message, areEqual);
