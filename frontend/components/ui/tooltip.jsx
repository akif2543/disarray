import React from "react";

const Tooltip = ({ text, className }) => (
  <div className={`tooltip ${className}`}>
    <div className="tooltip-content">
      <h1>{text}</h1>
    </div>
  </div>
);

export default Tooltip;

// import React from "react";

// const ServerIconTooltip = ({ text }) => (
//   <div className="tooltip s-icon-tt">
//     <div className="tooltip-content">
//       <h1>{text}</h1>
//     </div>
//   </div>
// );

// export default ServerIconTooltip;
