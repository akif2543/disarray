import React from "react";
import ReactDOM from "react-dom";

import configureStore from "./store/store";
import "./icons/fa_library";
import Root from "./root";

document.addEventListener("DOMContentLoaded", () => {
  let store;
  if (window.currentUser) {
    const [user] = Object.values(window.currentUser.user);
    const { servers, conversations, users } = window.currentUser;
    const preloadedState = {
      entities: {
        users: { ...users, [user.id]: user },
        servers,
        conversations,
      },
      session: { id: user.id },
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  ReactDOM.render(<Root store={store} />, document.getElementById("root"));
});
