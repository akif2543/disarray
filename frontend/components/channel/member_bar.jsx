import React, { useState } from "react";
import shortid from "shortid";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Member from "./member";

const MemberBar = ({ members, owner }) => {
  // const [popout, setPopout] = useState({})

  return (
    <nav className="member-bar">
      <h4>MEMBERS—{members.length}</h4>
      <ul>
        {members.map((m) =>
          m === undefined ? null : (
            <Member m={m} owner={owner} key={shortid.generate()} />
          )
        )}
      </ul>
    </nav>
  );
};

export default MemberBar;

//    {members.map((m) => {
//      if (m === undefined) return null;
//      return <Member m={m} owner={owner} key={shortid.generate()} />;
//    });
//  }
//<button type="button" key={shortid.generate()}>
// <img src={m.avatar} alt="" />
// <h2>{m.username}</h2>
// {owner === m.id && <FontAwesomeIcon icon="crown" size="sm" />}
//{" "}
//</button>;
