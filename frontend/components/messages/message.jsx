import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import MemberPopoutContainer from "../channel/member_popout";
import Tooltip from "../ui/tooltip";
import { shortDate, formatDate } from "../../util/date_util";
import EditMessageForm from "./edit_message_form";

const Message = ({ m, bottom, short, u, updateMessage, toggleEditting }) => {
  const el = useRef(null);
  const mesEl = useRef(null);

  const [popout, setPopout] = useState(false);
  const [options, setOptions] = useState(false);
  const [tooltips, setTooltips] = useState({ edit: false, more: false });
  const [editting, setEditting] = useState(false);

  const showTooltip = (type) => () =>
    setTooltips({ ...tooltips, [type]: true });
  const hideTooltip = (type) => () =>
    setTooltips({ ...tooltips, [type]: false });

  const togglePopout = () => setPopout(!popout);
  const toggleOptions = (bool) => () => setOptions(bool);

  const toggleEdit = () => {
    hideTooltip("edit");
    setEditting(!editting);
  };

  const isAuthor = u.id === m.author.id;

  const edited = m.createdAt !== m.updatedAt;

  const { edit, more } = tooltips;

  let style;

  if (mesEl && mesEl.current) {
    const { top } = mesEl.current.getBoundingClientRect();
    style = top > 66 ? { top: `${top - 66}px` } : { display: "none" };
  }

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
        <div className="msg-options" style={style}>
          {isAuthor && (
            <button
              type="button"
              className="msg-edit"
              onMouseOver={showTooltip("edit")}
              onFocus={showTooltip("edit")}
              onMouseLeave={hideTooltip("edit")}
              onBlur={hideTooltip("edit")}
              onClick={toggleEdit}
            >
              <FontAwesomeIcon icon="pen" />
            </button>
          )}
          {edit && <Tooltip text="Edit" className="msg-tt e" />}
          <button
            type="button"
            className={isAuthor ? "msg-more" : "msg-more solo"}
            onMouseOver={showTooltip("more")}
            onFocus={showTooltip("more")}
            onMouseLeave={hideTooltip("more")}
            onBlur={hideTooltip("more")}
          >
            <FontAwesomeIcon icon="ellipsis-h" />
          </button>
          {more && (
            <Tooltip
              text="More"
              className={isAuthor ? "msg-tt m" : "msg-tt ms"}
            />
          )}
        </div>
      )}
      <img src={m.author.avatar} alt="" className="avatar" />
      {short && (
        <span className={editting ? "date edit" : "date"}>
          {shortDate(m.createdAt)}
        </span>
      )}
      <div className={short ? "content short" : "content"}>
        <header className="msg-head">
          <h2 className="author-name" ref={el} onClick={togglePopout}>
            {m.author.username}
            <div className="msg-anchor"></div>
          </h2>
          {popout && (
            <MemberPopoutContainer
              m={m.author}
              togglePopout={togglePopout}
              el={el}
              chat={true}
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
