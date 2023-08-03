import "./App.css";
import axios from "axios";

import { Route, Switch } from "react-router-dom";
// component

// css
import "./assets/css/bootstrap.min.css";
import "./assets/css/plugins.css";
import "./assets/css/structure.css";
import "./assets/css/scrollspyNav.css";

// js

// import "./assets/js/perfect-scrollbar.min.js";
import "./assets/js/bootstrap/js/bootstrap.min.js";
import "./assets/js/bootstrap/js/popper.min";
import "./assets/js/app.js";
// import "./assets/js/custom";
// import "./assets/js/scrollspyNav.js";

import { Suspense, lazy } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { LOGIN_ADMIN, LOGOUT_ADMIN } from "./store/Admin/admin.type";
import setToken from "./utils/setToken";
import { useState } from "react";

import { IdleTimeoutManager } from "idle-timer-manager";

const Registration = lazy(() => import("./Pages/Registration"));
const UpdateCode = lazy(() => import("./Pages/UpdateCode"));
const Login = lazy(() => import("./Pages/Login"));
const Admin = lazy(() => import("./Pages/Admin"));
const AuthRoute = lazy(() => import("./utils/AuthRoute"));
const PrivateRouter = lazy(() => import("./utils/PrivateRoute"));

function App() {
  const [login, setLogin] = useState(false);
  useEffect(() => {
    axios
      .get("/login")
      .then((res) => {
        setLogin(res.data.login);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const isAuth = useSelector((state) => state.admin.isAuth);

  const dispatch = useDispatch();
  const key = sessionStorage.getItem("key");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token && !key) return;
    dispatch({ type: LOGIN_ADMIN, payload: token });
  }, [setToken, key]);

  useEffect(() => {
    const manager = new IdleTimeoutManager({
      timeout: 1800, //30 min (in sec)
      onExpired: (time) => {
        dispatch({ type: LOGOUT_ADMIN });
        return (window.location.href = "/");
      },
    });

    return () => {
      manager.clear();
    }; //eslint-disable-next-line
  }, []);

  return (
    <>
      <Suspense fallback={""}>
        <Switch>
          <AuthRoute exact path="/" component={login ? Login : Registration} />
          {isAuth && <Route path="/admin" component={Admin} />}
          <AuthRoute exact path="/code" component={UpdateCode} />
          <AuthRoute exact path="/login" component={Login} />
          <PrivateRouter path="/admin" component={Admin} />
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
