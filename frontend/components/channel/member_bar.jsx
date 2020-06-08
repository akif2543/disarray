import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import shortid from "shortid";

const MemberBar = ({ members, isOwner, currentUser }) => (
  <nav className="member-bar">
    <h4>MEMBERS—{members.length}</h4>
    <ul>
      {members.map((m) => {
        if (m === undefined) return null;
        return (
          <button type="button" key={shortid.generate()}>
            <img src={m.avatar} alt="" />
            <h2>{m.username}</h2>
            {isOwner && m.id === currentUser.id && (
              <FontAwesomeIcon icon="crown" size="sm" />
            )}
          </button>
        );
      })}
    </ul>
  </nav>
);

export default MemberBar;
