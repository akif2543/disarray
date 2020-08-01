import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import { stopLoading } from "../../actions/ui_actions";

import ServerBarContainer from "../server/bars/server_bar_container";
import ConversationPanelContainer from "../conversation/conversation_panel_container";
import FriendsContainer from "../friends/friends_container";
import ConversationContainer from "../conversation/conversation_container";

const Home = ({ stopLoad }) => {
  useEffect(() => {
    stopLoad();
  }, []);

  return (
    <>
      <ServerBarContainer />
      <ConversationPanelContainer />
      <Route exact path="/@me" component={FriendsContainer} />
      <Route path="/@me/:conversationId" component={ConversationContainer} />
    </>
  );
};

const mDTP = (dispatch) => ({
  stopLoad: () => dispatch(stopLoading()),
});

const HomeContainer = connect(null, mDTP)(Home);

export default HomeContainer;
