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
    selectItemsByGroup: (state, { payload }) => {
      const { groupId, allItemIds } = payload;
      state.selectedItems[groupId] = allItemIds;
    },
    unselectItem: (state, { payload }) => {
      const { itemId, groupId } = payload;
      const newSelectedByGroup = state.selectedItems[groupId].filter(
        (id) => id !== itemId
      );
      const newSelectedItems = {
        ...state.selectedItems,
        [groupId]: newSelectedByGroup,
      };
      console.log(newSelectedItems);
      if (Object.values(newSelectedItems).flat().length === 0) {
        state.selectedItems = {};
      } else {
        state.selectedItems = newSelectedItems;
      }
    },
    resetSelectedItems: (state) => {
      state.selectedItems = {};
    },
  },
});

export default systemSlice.reducer;

export const {
  addSelectedItem,
  selectItemsByGroup,
  unselectItem,
  resetSelectedItems,
} = systemSlice.actions;
