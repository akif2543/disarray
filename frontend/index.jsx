import React from "react";
import ReactDOM from "react-dom";

import configureStore from "./store/store";
import "./icons/fa_library";
import { login } from "./actions/session_actions";

const Root = (props) => <div></div>;

document.addEventListener("DOMContentLoaded", () => {
  let store;
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser },
      },
      session: { id: window.currentUser.id },
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  ReactDOM.render(<Root store={store} />, document.getElementById("root"));
});
