import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MemberPopoutContainer from "./member_popout";
import AvatarWithStatus from "../user/avatar_with_status";

const Member = ({ m, owner, s }) => {
  const el = useRef(null);

  const [popout, setPopout] = useState(false);

  const togglePopout = () => setPopout(!popout);

  const isOnline = m.status === "Online";

  return (
    <div className={isOnline ? "member" : "member offline"}>
      <button type="button" onClick={togglePopout} ref={el}>
        {isOnline ? (
          <AvatarWithStatus avatar={m.avatar} status={m.status} sidebar />
        ) : (
          <img src={m.avatar} alt="" className="avatar" />
        )}
        <h2>{s ? m.servers[s] || m.username : m.username}</h2>
        {owner === m.id && <FontAwesomeIcon icon="crown" size="sm" />}
      </button>
      {popout && (
        <MemberPopoutContainer m={m} togglePopout={togglePopout} el={el} />
      )}
    </div>
  );
};

export default Member;
