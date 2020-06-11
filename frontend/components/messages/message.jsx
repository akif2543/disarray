import React from "react";

const Message = ({ m, bottom, short }) => {
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
        <header>
          <h2>{m.author.username}</h2>
          <span>{formatDate(m.createdAt)}</span>
        </header>
        <p>{m.body}</p>
      </div>
      <div ref={bottom} />
    </div>
  );
};

export default Message;
