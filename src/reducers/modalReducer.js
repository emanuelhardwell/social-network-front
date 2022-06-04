import { types } from "../types/types";

const initialState = {
  modalOpen: false,
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.modalOpen:
      return {
        ...state,
        modalOpen: true,
      };

    case types.modalClose:
      return {
        ...state,
        modalOpen: false,
      };

    default:
      return state;
  }
};
