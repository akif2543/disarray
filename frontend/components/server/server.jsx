import React from "react";

import ServerBarContainer from "./bars/server_bar_container";
import ServerPanelContainer from "./bars/server_panel_container";
import TextChannelContainer from "../channel/text_channel_container";

const Server = () => (
  <>
    <ServerBarContainer />
    <ServerPanelContainer />
    <TextChannelContainer />
  </>
);

export default Server;
