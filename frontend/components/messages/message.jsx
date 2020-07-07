import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import MemberPopoutContainer from "../channel/member_popout";
import Tooltip from "../ui/tooltip";
import { shortDate, formatDate } from "../../util/date_util";

const Message = ({ m, bottom, short, u }) => {
  const el = useRef(null);
  const mesEl = useRef(null);
  const editEl = useRef(null);
  const moreEl = useRef(null);

  const [popout, setPopout] = useState(false);
  const [options, setOptions] = useState(false);
  const [tooltips, setTooltips] = useState({ edit: false, more: false });

  const showTooltip = (type) => () =>
    setTooltips({ ...tooltips, [type]: true });
  const hideTooltip = (type) => () =>
    setTooltips({ ...tooltips, [type]: false });

  const togglePopout = () => setPopout(!popout);
  const toggleOptions = (bool) => () => setOptions(bool);

  const isAuthor = u.id === m.author.id;

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
      {options && (
        <div className="msg-options" style={style}>
          {isAuthor && (
            <button
              type="button"
              className="msg-edit"
              ref={editEl}
              onMouseOver={showTooltip("edit")}
              onFocus={showTooltip("edit")}
              onMouseLeave={hideTooltip("edit")}
              onBlur={hideTooltip("edit")}
            >
              <FontAwesomeIcon icon="pen" />
            </button>
          )}
          {edit && <Tooltip text="Edit" className="msg-tt e" el={editEl} />}
          <button
            type="button"
            className={isAuthor ? "msg-more" : "msg-more solo"}
            ref={moreEl}
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
              el={moreEl}
            />
          )}
        </div>
      )}
      <img src={m.author.avatar} alt="" className="avatar" />
      {short && <span className="date">{shortDate(m.createdAt)}</span>}
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
        <p>{m.body}</p>
      </div>
      <div ref={bottom} />
    </div>
  );
};

export default Message;
