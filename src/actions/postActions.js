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

const postsGeted = (posts) => ({
  type: types.postsGeted,
  payload: posts,
});
