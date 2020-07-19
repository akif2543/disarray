import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MemberPopoutContainer from "./member_popout";

const Member = ({ m, owner, s }) => {
  const el = useRef(null);

  const [popout, setPopout] = useState(false);

  const togglePopout = () => setPopout(!popout);

  return (
    <div className="member">
      <button type="button" onClick={togglePopout} ref={el}>
        <img src={m.avatar} alt="" />
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
