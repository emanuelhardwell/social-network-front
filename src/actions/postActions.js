import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";

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
      console.log(body);
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

const postLiked = (post) => ({
  type: types.postLiked,
  payload: post,
});

const postsGeted = (posts) => ({
  type: types.postsGeted,
  payload: posts,
});
