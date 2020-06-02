import React from "react";
import { Link } from "react-router-dom";

const SplashJumbotron = ({ buttonText }) => (
  <section>
    <h1>A new way to chat with your communities and friends.</h1>
    <p>
      Discord is the easiest way to communicate over voice, video, and text,
      whether you’re part of a school club, a nightly gaming group, a worldwide
      art community, or just a handful of friends that want to hang out.
    </p>
    <div className="splash-btns">
      <Link to="#">
        <button type="button">Demo Login</button>
      </Link>
      <Link to="/login">
        <button type="button">{buttonText}</button>
      </Link>
    </div>
    {/* splash image */}
  </section>
);

export default SplashJumbotron;
