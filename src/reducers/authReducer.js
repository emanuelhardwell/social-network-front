import { types } from "../types/types";

const initialState = {
  checking: true,
  //   name: "Emanuel",
  //   uid: "123456",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authCheckingFinish:
      return {
        ...state,
        checking: false,
      };

    case types.authLogin:
      return {
        ...state,
        ...action.payload,
        checking: false,
      };

    case types.authLogout:
      return {
        checking: false,
      };

    default:
      return state;
  }
};
