import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  const jwt = localStorage.getItem('jwt');
  return (
    <Route>
      {() =>
        props.isLogged || jwt ? <Component {...props} /> : <Redirect to="/" />
      }
    </Route>
  );
};

export default ProtectedRoute;
