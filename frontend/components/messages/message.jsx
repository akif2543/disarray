import React, { useState } from "react";
import MemberPopoutContainer from "../channel/member_popout";

const Message = ({ m, bottom, short }) => {
  const [popout, setPopout] = useState(false);
  const togglePopout = () => setPopout(!popout);

  const dateDiff = (date) => {
    const now = Date.now();
    const messageDate = date.getTime();
    return parseInt((now - messageDate) / (24 * 3600 * 1000));
  };

  const formatDate = (date) => {
    const mDate = new Date(date);
    const diff = dateDiff(mDate);

    switch (diff) {
      case 0:
        return `Today at ${mDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`;
      case 1:
        return `Yesterday at ${mDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`;
      default:
        return mDate.toLocaleDateString();
    }
  };

  const shortDate = (date) =>
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className={short ? "message short" : "message"}>
      <img src={m.author.avatar} alt="" className="avatar" />
      {short && <span>{shortDate(m.createdAt)}</span>}
      <div className={short ? "content short" : "content"}>
        {popout && (
          <MemberPopoutContainer m={m.author} togglePopout={togglePopout} />
        )}
        <header className="msg-head">
          <h2 className="author-name" onClick={togglePopout}>
            {m.author.username}
            <div className="msg-anchor"></div>
          </h2>
          <span>{formatDate(m.createdAt)}</span>
        </header>
        <p>{m.body}</p>
      </div>
      <div ref={bottom} />
    </div>
  );
};

export default Message;
