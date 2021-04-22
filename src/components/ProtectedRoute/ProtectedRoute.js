import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => (
  <Route>
    {props.loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: "/", noAuthRedirect: true }} />
    )}
  </Route>
);

export default ProtectedRoute;
