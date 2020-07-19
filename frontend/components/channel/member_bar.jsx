import React from "react";
import shortid from "shortid";

import Member from "./member";

const MemberBar = ({ members, owner, s }) => {
  const online = [];
  const offline = [];

  if (s) {
    members.forEach((u) => {
      if (u.online) {
        online.push(u);
      } else {
        offline.push(u);
      }
    });
  }

  return (
    <div className="member-bar-wrapper">
      {s ? (
        <nav className="member-bar">
          <h4>ONLINE—{online.length}</h4>
          <ul>
            {online.map((m) => {
              if (m === undefined) return null;
              return (
                <Member m={m} owner={owner} key={shortid.generate()} s={s} />
              );
            })}
          </ul>
          <h4>OFFLINE—{offline.length}</h4>
          <ul>
            {offline.map((m) => {
              if (m === undefined) return null;
              return (
                <Member m={m} owner={owner} key={shortid.generate()} s={s} />
              );
            })}
          </ul>
        </nav>
      ) : (
        <nav className="member-bar">
          <h4>MEMBERS—{members.length}</h4>
          <ul>
            {members.map((m) => {
              if (m === undefined) return null;
              return <Member m={m} owner={owner} key={shortid.generate()} />;
            })}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default MemberBar;
