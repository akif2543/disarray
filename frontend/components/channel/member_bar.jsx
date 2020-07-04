import React from "react";
import shortid from "shortid";

import Member from "./member";

const MemberBar = ({ members, owner }) => {
  return (
    <div className="member-bar-wrapper">
      <nav className="member-bar">
        <h4>MEMBERS—{members.length}</h4>
        <ul>
          {members.map((m) => {
            if (m === undefined) return null;
            return <Member m={m} owner={owner} key={shortid.generate()} />;
          })}
        </ul>
      </nav>
    </div>
  );
};

export default MemberBar;
