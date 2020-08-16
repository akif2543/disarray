import React from "react";
import ReactDOM from "react-dom";

import "regenerator-runtime/runtime";
import "core-js/modules/es.promise";
import "core-js/modules/es.array.iterator";

import configureStore from "./store/store";
import "./icons/fa_library";
import Root from "./components/app/root";

document.addEventListener("DOMContentLoaded", () => {
  let store;
  if (window.currentUser) {
    const [user] = Object.values(window.currentUser.user);
    const {
      servers,
      conversations,
      users,
      channels,
      messages,
    } = window.currentUser;
    const {
      id,
      conversees,
      friends,
      pendingIn,
      pendingOut,
      blocked,
      email,
    } = user;
    const preloadedState = {
      entities: {
        users: { ...users, [user.id]: user },
        servers,
        conversations,
        channels,
        messages,
      },
      session: {
        id,
        conversations: user.conversations,
        conversees,
        friends,
        pendingIn,
        pendingOut,
        blocked,
        email,
      },
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  ReactDOM.render(<Root store={store} />, document.getElementById("root"));
});
