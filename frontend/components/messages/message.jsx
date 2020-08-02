import React, { useState, useRef, memo } from "react";

import MemberPopoutContainer from "../channel/member_popout";
import MessageOpts from "./message_opts";
import EditMessageForm from "./edit_message_form";

import { shortDate, formatDate } from "../../util/date_util";
import MessageDropdown from "./message_dropdown";

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
  const el = useRef(null);
  const mesEl = useRef(null);

  const [popout, setPopout] = useState(false);
  const [options, setOptions] = useState(false);
  const [editing, setEditing] = useState(false);

  const [dropdown, setDropdown] = useState(false);

  const toggleDropdown = () => setDropdown(!dropdown);

  const togglePopout = () => setPopout(!popout);
  const toggleOptions = (bool) => () => setOptions(bool);

  const toggleEdit = () => {
    // toggleEditing();
    setEditing(!editing);
  };

  const isAuthor = u.id === m.author;
  const edited = m.createdAt !== m.updatedAt;

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
      <img src={a.avatar} alt="" className="avatar" onClick={togglePopout} />
      {short && (
        <span className={editing ? "date edit" : "date"}>
          {shortDate(m.createdAt)}
        </span>
      )}
      <div className={short ? "content short" : "content"}>
        <header className="msg-head">
          <h2 className="author-name" ref={el} onClick={togglePopout}>
            {m.textChannel ? a.servers[s.id] || a.username : a.username}
          </h2>
          {popout && (
            <MemberPopoutContainer
              m={a}
              s={m.textChannel ? s : null}
              togglePopout={togglePopout}
              el={el}
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
    </div>
  );
};

export default memo(Message, areEqual);
