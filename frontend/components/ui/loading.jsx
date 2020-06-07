import React from "react";

const Loading = (props) => (
  <main className="loading">
    <div className="loading-group">
      <img src={window.logoIconURL} alt="" />
      <h1>Loading...</h1>
    </div>
  </main>
);

export default Loading;
