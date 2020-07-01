import React from "react";

const Tooltip = ({ text, className, el }) => {
  let offsetX;
  let offsetY;

  if (el) {
    // debugger;
    // console.log(el.current.getBoundingClientRect());
    const { top, height, left } = el.current.getBoundingClientRect();
    offsetY = top + height / 6;
    offsetX = left;
  }
  return (
    <div
      className={`tooltip ${className}`}
      style={
        el && {
          top: `${offsetY}px`,
          // left: `${offsetX}px`,
        }
      }
    >
      <div className="tooltip-content">
        <h1>{text}</h1>
      </div>
    </div>
  );
};

export default Tooltip;
