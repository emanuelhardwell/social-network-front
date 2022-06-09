import React, { useEffect } from "react";
import { Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Register } from "../components/auth/Register";
import { Login } from "../components/auth/Login";
import { Redirect } from "react-router-dom";
import { PostScreen } from "../components/posts/PostScreen";
import { PrivateRouter } from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";
import { useDispatch, useSelector } from "react-redux";
import { startAuthCheckingFinish } from "../actions/authActions";
import { LoadingRoller } from "../components/loaders/LoadingRoller";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PostScreenPaginate } from "../components/posts/PostScreenPaginate";
import { PostDetail } from "../components/posts/PostDetail";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { uid, checking } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startAuthCheckingFinish());
  }, [dispatch]);

  if (checking) {
    return <LoadingRoller />;
  }

  return (
    <>
      <Router>
        <div>
          <Switch>
            <PrivateRouter
              exact
              path="/"
              component={PostScreen}
              isAuthenticated={!!uid}
            />

            <PrivateRouter
              exact
              path="/posts"
              component={PostScreenPaginate}
              isAuthenticated={!!uid}
            />

            <PrivateRouter
              exact
              path="/post/:id"
              component={PostDetail}
              isAuthenticated={!!uid}
            />

            <PublicRouter
              exact
              path="/login"
              component={Login}
              isAuthenticated={!!uid}
            />
            <PublicRouter
              exact
              path="/register"
              component={Register}
              isAuthenticated={!!uid}
            />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
};
