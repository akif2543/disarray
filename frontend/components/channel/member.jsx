import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MemberPopoutContainer from "./member_popout";
import AvatarWithStatus from "../user/avatar_with_status";

const Member = ({ m, owner, s }) => {
  const el = useRef(null);

  const [popout, setPopout] = useState(false);

  const togglePopout = () => setPopout(!popout);

  return (
    <div className={m.online ? "member" : "member offline"}>
      <button type="button" onClick={togglePopout} ref={el}>
        {m.online ? (
          <AvatarWithStatus avatar={m.avatar} online={m.online} sidebar />
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
