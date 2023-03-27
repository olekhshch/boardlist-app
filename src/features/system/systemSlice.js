import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedItems: {},
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    addSelectedItem: (state, { payload }) => {
      const { groupId, itemId } = payload;
      const selectedByGroup = state.selectedItems[groupId] ?? [];
      state.selectedItems[groupId] = [...selectedByGroup, itemId];
    },
    resetSelectedItems: (state) => {
      state.selectedItems = {};
    },
  },
});

export default systemSlice.reducer;

export const { addSelectedItem, resetSelectedItems } = systemSlice.actions;
