import { types } from "../types/types";

export const startModalOpen = () => ({
  type: types.modalOpen,
});

export const startModalClose = () => ({
  type: types.modalClose,
});
