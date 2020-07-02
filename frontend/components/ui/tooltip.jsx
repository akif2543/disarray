import React from "react";

const Tooltip = ({ text, className, el }) => {
  let style;

  if (el && el.current) {
    // debugger;
    const { top, height, left } = el.current.getBoundingClientRect();
    const { offsetTop } = el.current;
    switch (className) {
      case "s-icon-tt":
        style = {
          top: `${top + height / 6}px`,
        };
        break;
      case "cl-tt add":
        style = {
          top: `${-26}px`,
          right: `${-36}px`,
        };
        break;
      case "cl-tt inv":
        style = {
          top: `${top - offsetTop}px`,
          // right: `${-36}px`,
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
