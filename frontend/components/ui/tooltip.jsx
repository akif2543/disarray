import React from "react";

const Tooltip = ({ text, className, el }) => {
  let style;

  if (el && el.current) {
    // debugger;
    const {
      top,
      height,
      left,
      width,
      right,
    } = el.current.getBoundingClientRect();
    const { offsetTop } = el.current;
    switch (className) {
      case "s-icon-tt":
        style = {
          top: `${top + height / 6}px`,
        };
        break;
      case "cl-tt add":
        style = {
          top: `${24}px`,
          right: `${-36}px`,
        };
        break;
      case "cl-tt add-dm":
        style = {
          top: `${-26}px`,
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
      default:
        break;
    }
    console.log(el.current.getBoundingClientRect());
    console.log(`offsetTop: ${el.current.offsetTop}`);
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
