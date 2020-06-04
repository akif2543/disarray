import { connect } from "react-redux";

import { loading } from "./reducers/selectors";
import App from "./app";

const mSTP = (state) => ({
  loading: loading(state),
});

const AppContainer = connect(mSTP)(App);

export default AppContainer;
