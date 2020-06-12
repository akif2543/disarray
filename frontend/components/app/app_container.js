import { connect } from "react-redux";

import { loading, settings } from "../../reducers/selectors";
import App from "./app";

const mSTP = (state) => ({
  loading: loading(state),
  settings: Boolean(settings(state)),
});

const AppContainer = connect(mSTP)(App);

export default AppContainer;
