import React, { useState, useRef } from "react";

import MemberPopoutContainer from "../channel/member_popout";
import MessageOpts from "./message_opts";
import EditMessageForm from "./edit_message_form";

import { shortDate, formatDate } from "../../util/date_util";
import MessageDropdown from "./message_dropdown";

const Message = ({ m, bottom, short, u, updateMessage, a }) => {
  const el = useRef(null);
  const mesEl = useRef(null);

  const [popout, setPopout] = useState(false);
  const [options, setOptions] = useState(false);
  const [editting, setEditting] = useState(false);

  const [dropdown, setDropdown] = useState(false);

  const toggleDropdown = () => setDropdown(!dropdown);

  const togglePopout = () => setPopout(!popout);
  const toggleOptions = (bool) => () => setOptions(bool);

  const toggleEdit = () => {
    // hideTooltip("edit");
    setEditting(!editting);
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
      {options && !editting && (
        <MessageOpts
          isAuthor={isAuthor}
          toggleEdit={toggleEdit}
          toggleDropdown={toggleDropdown}
        />
      )}
      {dropdown && (
        <MessageDropdown
          isAuthor={isAuthor}
          el={mesEl}
          toggleDropdown={toggleDropdown}
          toggleEdit={toggleEdit}
        />
      )}
      <img src={a.avatar} alt="" className="avatar" />
      {short && (
        <span className={editting ? "date edit" : "date"}>
          {shortDate(m.createdAt)}
        </span>
      )}
      <div className={short ? "content short" : "content"}>
        <header className="msg-head">
          <h2 className="author-name" ref={el} onClick={togglePopout}>
            {a.username}
          </h2>
          {popout && (
            <MemberPopoutContainer
              m={a}
              togglePopout={togglePopout}
              el={el}
              chat
            />
          )}
          <span className="date">{formatDate(m.createdAt)}</span>
        </header>
        {editting ? (
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

export default Message;
