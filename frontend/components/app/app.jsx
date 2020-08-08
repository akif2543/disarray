import React, { useEffect, Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";

import { AuthRoute, ProtectedRoute } from "../../util/route_util";

import {
  appearanceSub,
  friendsSub,
  serverSubs,
  convoChannelSub,
  convoSubs,
} from "../../util/socket_util";

import Loading from "../ui/loading";

// import SettingsContainer from "../ui/settings";
// import ModalContainer from "../ui/modal";

const Settings = lazy(() =>
  import(/* webpackChunkName: "settings" */ "../ui/settings")
);

const Modal = lazy(() => import(/* webpackChunkName: "modal" */ "../ui/modal"));

const Splash = lazy(() =>
  import(/* webpackChunkName: "splash" */ "../splash/splash_container")
);

const Session = lazy(() =>
  import(/* webpackChunkName: "session" */ "../session/session_container")
);

const Home = lazy(() => import(/* webpackChunkName: "home" */ "../home/home"));
const Server = lazy(() =>
  import(/* webpackChunkName: "server" */ "../server/server")
);

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
      appearanceSub(user.id, receiveStatus, receiveSub);
      friendsSub(user.id, friendActions, receiveSub);
      serverSubs(servers, serverActions, messageActions, receiveSub);
      convoChannelSub(user.id, receiveConversation, messageActions, receiveSub);
      convoSubs(convos, messageActions, receiveSub);
    }
  }, [loggedIn, Boolean(App)]);

  return (
    <div className="app">
      {loading && <Loading />}

      <Suspense fallback={<Loading />}>
        {settings && <Settings />}
        {modal && <Modal />}
        <Switch>
          <AuthRoute path={["/register", "/login"]} component={Session} />
          <ProtectedRoute path="/@me" component={Home} />
          <ProtectedRoute
            path="/channels/:serverId/:channelId"
            component={Server}
          />
          <Route path="/" component={Splash} />
        </Switch>
      </Suspense>
    </div>
  );
};

export default Application;
