import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { modalReducer } from "./modalReducer";
import { postReducer } from "./postReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  posts: postReducer,
});
