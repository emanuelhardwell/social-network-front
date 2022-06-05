import { types } from "../types/types";

const initialState = {
  posts: [],
  postActive: null,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.postsGeted:
      return {
        ...state,
        posts: [...action.payload],
      };

    case types.postAdded:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };

    case types.postUpdated:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id ? action.payload : post
        ),
      };

    case types.postDeleted:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload.id),
      };

    case types.postSetActive:
      return {
        ...state,
        postActive: action.payload,
      };

    case types.postClearActive:
      return {
        ...state,
        postActive: null,
      };

    default:
      return state;
  }
};