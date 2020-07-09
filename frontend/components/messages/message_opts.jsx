import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Tooltip from "../ui/tooltip";

const MessageOpts = ({ isAuthor, toggleEdit, toggleDropdown }) => {
  const [tooltips, setTooltips] = useState({ edit: false, more: false });

  const showTooltip = (type) => () =>
    setTooltips({ ...tooltips, [type]: true });
  const hideTooltip = (type) => () =>
    setTooltips({ ...tooltips, [type]: false });

  const { edit, more } = tooltips;

  return (
    <div className="msg-options">
      {isAuthor && (
        <button
          type="button"
          className="msg-edit"
          onMouseOver={showTooltip("edit")}
          onFocus={showTooltip("edit")}
          onMouseLeave={hideTooltip("edit")}
          onBlur={hideTooltip("edit")}
          onClick={toggleEdit}
        >
          <FontAwesomeIcon icon="pen" />
        </button>
      )}
      {edit && <Tooltip text="Edit" className="msg-tt e" />}
      <button
        type="button"
        className={isAuthor ? "msg-more" : "msg-more solo"}
        onMouseOver={showTooltip("more")}
        onFocus={showTooltip("more")}
        onMouseLeave={hideTooltip("more")}
        onBlur={hideTooltip("more")}
        onClick={toggleDropdown}
      >
        <FontAwesomeIcon icon="ellipsis-h" />
      </button>
      {more && (
        <Tooltip text="More" className={isAuthor ? "msg-tt m" : "msg-tt ms"} />
      )}
    </div>
  );
};

export default MessageOpts;
