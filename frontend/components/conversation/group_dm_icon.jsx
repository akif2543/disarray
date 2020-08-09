import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GroupDMIcon = ({ id, sidebar }) => {
  const colors = ["blue", "yellow", "green", "red", "pink"];

  return (
    <div className={`group-dm-icon ${colors[id % colors.length]}`}>
      <FontAwesomeIcon icon="user-friends" size={sidebar ? "lg" : "2x"} />
    </div>
  );
};

export default GroupDMIcon;
