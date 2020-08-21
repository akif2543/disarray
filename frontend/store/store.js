import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
// import logger from "redux-logger";

import rootReducer from "../reducers/root_reducer";

const configureStore = (preloadedState) =>
  createStore(rootReducer, preloadedState, applyMiddleware(thunk));
// createStore(
//   rootReducer,
//   preloadedState,
//   composeWithDevTools(applyMiddleware(thunk, logger))
// );

export default configureStore;
