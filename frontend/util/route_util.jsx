import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const Auth = ({ loggedIn, exact, path, component: Component }) => (
  <Route
    path={path}
    exact={exact}
    render={(props) =>
      !loggedIn ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

const mapStateToProps = (state) => ({
  loggedIn: Boolean(state.session.id),
});

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));

const Protected = ({ loggedIn, exact, path, component: Component }) => (
  <Route
    path={path}
    exact={exact}
    render={(props) =>
      loggedIn ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

export const ProtectedRoute = withRouter(
  connect(mapStateToProps, null)(Protected)
);
