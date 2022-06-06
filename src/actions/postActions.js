import Swal from "sweetalert2";
import { fetchWithToken, fetchWithTokenAndFile } from "../helpers/fetch";
import { types } from "../types/types";
import { toast } from "react-toastify";

export const getPosts = () => {
  return async (dispatch) => {
    const res = await fetchWithToken("post/");
    const body = await res.json();

    if (body.ok) {
      dispatch(postsGeted(body.posts));
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const startPostLiked = (id) => {
  return async (dispatch) => {
    const res = await fetchWithToken(`post/like/${id}`, {}, "PUT");
    const body = await res.json();

    if (body.ok) {
      dispatch(postLiked(body.post));
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const startPostAdded = (post) => {
  return async (dispatch) => {
    const res = await fetchWithTokenAndFile("post/", post, "POST");
    const body = await res.json();

    if (body.ok) {
      dispatch(postAdded(body.post));
      toast.success(body.msg);
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const startPostDeleted = (id) => {
  return async (dispatch) => {
    const res = await fetchWithToken(`post/${id}`, {}, "DELETE");
    const body = await res.json();

    if (body.ok) {
      dispatch(postDeleted(id));
      toast.success(body.msg, { autoClose: 4000 });
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const startPostUpdated = (post, id) => {
  return async (dispatch) => {
    const res = await fetchWithTokenAndFile(`post/${id}`, post, "PUT");
    const body = await res.json();

    if (body.ok) {
      dispatch(postUpdated(body.post));
      toast.success(body.msg);
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const postSetActive = (post) => ({
  type: types.postSetActive,
  payload: post,
});

export const postClearActive = () => ({
  type: types.postClearActive,
});

const postDeleted = (id) => ({
  type: types.postDeleted,
  payload: id,
});

const postAdded = (post) => ({
  type: types.postAdded,
  payload: post,
});

const postUpdated = (post) => ({
  type: types.postUpdated,
  payload: post,
});

const postLiked = (post) => ({
  type: types.postLiked,
  payload: post,
});

const postsGeted = (posts) => ({
  type: types.postsGeted,
  payload: posts,
});

export const postLogout = () => ({
  type: types.postLogout,
});
