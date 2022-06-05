import Swal from "sweetalert2";
import { fetchWithOutToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";

export const startLogin = (user) => {
  return async (dispatch) => {
    const res = await fetchWithOutToken("auth/login", user, "POST");
    const body = await res.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(login({ uid: body.uid, name: body.name }));
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const startRegister = (user) => {
  return async (dispatch) => {
    const res = await fetchWithOutToken("auth/new", user, "POST");
    const body = await res.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(login({ uid: body.uid, name: body.name }));
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const startAuthCheckingFinish = () => {
  return async (dispatch) => {
    const res = await fetchWithToken("auth/renew");
    const body = await res.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(login({ uid: body.uid, name: body.name }));
    } else {
      Swal.fire("Error", body.msg, "error");
      dispatch(authCheckingFinish());
    }
  };
};

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  };
};

const authCheckingFinish = () => ({
  type: types.authCheckingFinish,
});

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

const logout = () => ({
  type: types.authLogout,
});
