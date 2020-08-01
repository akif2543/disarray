import React, { useEffect, Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";

import { AuthRoute, ProtectedRoute } from "../../util/route_util";

import SplashContainer from "../splash/splash_container";
import SessionContainer from "../session/session_container";

const Home = lazy(() =>
  import(/* webpackPrefetch: true, webpackChunkName: "home" */ "../home/home")
);
const Server = lazy(() =>
  import(
    /* webpackPrefetch: true, webpackChunkName: "server" */ "../server/server"
  )
);
const Settings = lazy(() =>
  import(
    /* webpackPrefetch: true, webpackChunkName: "settings" */ "../ui/settings"
  )
);
const Modal = lazy(() =>
  import(/* webpackPrefetch: true, webpackChunkName: "modal" */ "../ui/modal")
);

import Loading from "../ui/loading";

import {
  appearanceSub,
  friendsSub,
  serverSubs,
  convoChannelSub,
  convoSubs,
} from "../../util/socket_util";

const Application = ({
  loading,
  settings,
  loggedIn,
  user,
  servers,
  convos,
  modal,
  receiveStatus,
  receiveSub,
  receiveConversation,
  friendActions,
  serverActions,
  messageActions,
}) => {
  useEffect(() => {
    if (loggedIn && App) {
      appearanceSub(user.id, receiveStatus);
      friendsSub(user.id, friendActions);
      serverSubs(servers, serverActions, messageActions, receiveSub);
      convoChannelSub(user.id, receiveConversation, messageActions, receiveSub);
      convoSubs(convos, messageActions, receiveSub);
    }
  }, [loggedIn, Boolean(App)]);

  return (
    <div className="app">
      <Route exact path="/" component={SplashContainer} />
      {loading && <Loading />}
      <AuthRoute
        exact
        path={["/register", "/login"]}
        component={SessionContainer}
      />
      <Suspense fallback={null}>
        {settings && <Settings />}
        {modal && <Modal />}
        <Switch>
          <ProtectedRoute path="/@me" component={Home} />
          <ProtectedRoute
            path="/channels/:serverId/:channelId"
            component={Server}
          />
        </Switch>
      </Suspense>
    </div>
  );
};

export default Application;
