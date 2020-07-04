import React from "react";

const Tooltip = ({ text, className, el }) => {
  let style;

  if (el && el.current) {
    const { top, height, right, width } = el.current.getBoundingClientRect();
    switch (className) {
      case "s-icon-tt":
        style = {
          top: `${top + height / 6}px`,
        };
        break;
      case "cl-tt add":
        style = {
          top: `${22}px`,
          right: `${-36}px`,
        };
        break;
      case "cl-tt add-dm":
        style = {
          top: `${-29}px`,
          right: `${-22}px`,
        };
        break;
      case "cl-tt inv":
        style = {
          top: `${top - height * 3.5}px`,
          right: `${-10}px`,
        };
        break;
      case "cl-tt edit":
        style = {
          top: `${top - height * 3.5}px`,
          right: `${-27}px`,
        };
        break;
      case "nav-tt mute":
        style = {
          left: `${right - 74 - width / 2}px`,
        };
        break;
      case "nav-tt call":
        style = {
          left: `${right - 79 - width / 2}px`,
        };
        break;
      case "nav-tt pin":
        style = {
          left: `${right - 85 - width / 2}px`,
        };
        break;
      case "nav-tt members":
        style = {
          left: `${right - 52 - width / 2}px`,
        };
        break;
      case "nav-tt add-user":
        style = {
          left: `${right - 90 - width / 2}px`,
        };
        break;
      case "nav-tt at":
        style = {
          left: `${right - 83 - width / 2}px`,
        };
        break;
      case "nav-tt git":
        style = {
          left: `${right - 38 - width / 2}px`,
        };
        break;
      default:
        break;
    }
  }
  return (
    <div className={`tooltip ${className}`} style={style}>
      <div className="tooltip-content">
        <h1>{text}</h1>
      </div>
    </div>
  );
};

export default Tooltip;
