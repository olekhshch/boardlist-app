import { createSlice } from "@reduxjs/toolkit";

/*
add-section
group-theme
status-list
*/

const initialState = {
  isOpen: false,
  menuType: "",
  coordinates: {
    left: 100,
    top: 100,
  },
  statusContent: null,
  itemId: null,
  sectionIndex: null,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    openMenu: (state, { payload }) => {
      console.log(payload);
      const { type, coordinates, statusContent, itemId, sectionIndex } =
        payload;
      state.isOpen = true;
      state.menuType = type;
      state.coordinates = coordinates;
      if (type === "status-list") {
        state.statusContent = statusContent;
        state.itemId = itemId;
        state.sectionIndex = sectionIndex;
      }
    },
    closeMenu: (state) => {
      state.isOpen = false;
    },
  },
});

export default menuSlice.reducer;

export const { openMenu, closeMenu } = menuSlice.actions;
