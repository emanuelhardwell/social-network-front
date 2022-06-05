import React from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

export const PrivateRouter = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  //   console.log(rest.location.pathname);
  //   localStorage.setItem("pathName", rest.location.pathname);

  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

PrivateRouter.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
