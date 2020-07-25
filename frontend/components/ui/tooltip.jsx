import React from "react";

const Tooltip = ({ text, className, el }) => {
  let style;

  if (el && el.current) {
    const {
      top,
      bottom,
      height,
      right,
      width,
    } = el.current.getBoundingClientRect();
    switch (className) {
      case "sb-tt":
        style = {
          top: `${bottom - 17.5 - height / 2}px`,
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
          top: `${20}px`,
          right: `${-22}px`,
        };
        break;
      case "cl-tt inv":
        style = {
          top: `${top - height * 3.5}px`,
          left: `${right - 129 - width / 2}px`,
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
          left: `${right - 71 - width / 2}px`,
        };
        break;
      case "nav-tt at":
        style = {
          left: `${right - 83 - width / 2}px`,
        };
        break;
      case "nav-tt ath":
        style = {
          right: `calc(100vw - ${right + 75}px)`,
        };
        break;
      case "nav-tt git":
        style = {
          left: `${right - 30 - width / 2}px`,
        };
        break;
      case "nav-tt gith":
        style = {
          right: `calc(100vw - ${right + 20}px)`,
        };
        break;
      case "nav-tt dm":
        style = {
          right: `calc(100vw - ${right + 52.5}px)`,
          // left: `${right - 60 - width / 2}px`,
        };
        break;
      case "fl-tt msg":
        style = {
          top: `${top - 45}px`,
          right: `calc(100vw - ${right + 22.5}px)`,
        };
        break;
      case "fl-tt more":
        style = {
          top: `${top - 45}px`,
          right: `calc(100vw - ${right + 12.5}px)`,
        };
        break;
      case "fl-tt acc":
        style = {
          top: `${top - 45}px`,
          right: `calc(100vw - ${right + 17}px)`,
        };
        break;
      case "fl-tt ig":
        style = {
          top: `${top - 45}px`,
          right: `calc(100vw - ${right + 15}px)`,
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
