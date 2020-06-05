import {
  RECEIVE_SERVER_ERRORS,
  CLEAR_SERVER_ERRORS,
  RECEIVE_SERVERS,
  RECEIVE_SERVER,
} from "../actions/server_actions";

const serverErrorsReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_SERVER_ERRORS:
      return action.errors;
    case CLEAR_SERVER_ERRORS:
      return [];
    case RECEIVE_SERVERS:
      return [];
    case RECEIVE_SERVER:
      return [];
    default:
      return state;
  }
};

export default serverErrorsReducer;
