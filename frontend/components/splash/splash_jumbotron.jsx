import React from "react";
import { Link } from "react-router-dom";

const SplashJumbotron = ({ loggedIn, handleDemo }) => (
  <section className="splash-jumbo">
    <h1>A new way to chat with your communities and friends.</h1>
    <p>
      Discord is the easiest way to communicate over voice, video, and text,
      whether you’re part of a school club, a nightly gaming group, a worldwide
      art community, or just a handful of friends that want to hang out.
    </p>
    <div className="splash-btns">
      <Link to="/@me" onClick={handleDemo}>
        <button type="button" className="splash-jumbo-left">
          Demo
        </button>
      </Link>
      <Link to={loggedIn ? "/@me" : "/login"}>
        <button type="button" className="splash-jumbo-right">
          {loggedIn ? "Open" : "Open Disarray in your browser"}
        </button>
      </Link>
    </div>
  </section>
);

export default SplashJumbotron;
