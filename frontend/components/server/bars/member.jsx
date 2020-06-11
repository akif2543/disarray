import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MemberPopoutContainer from "./member_popout";

const Member = ({ m, owner }) => {
  const [popout, setPopout] = useState(false);

  const togglePopout = () => setPopout(!popout);

  return (
    <div>
      {popout && <MemberPopoutContainer m={m} togglePopout={togglePopout} />}
      <button type="button" onClick={togglePopout}>
        <img src={m.avatar} alt="" />
        <h2>{m.username}</h2>
        {owner === m.id && <FontAwesomeIcon icon="crown" size="sm" />}
      </button>
    </div>
  );
};

export default Member;
